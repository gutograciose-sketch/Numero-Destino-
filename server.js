import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files from the dist folder in production
    const distPath = path.resolve(__dirname, 'dist');
    const assetsPath = path.resolve(distPath, 'assets');
    
    console.log('--- Production Config ---');
    console.log('Dirname:', __dirname);
    console.log('Dist Path:', distPath);
    console.log('Assets Path:', assetsPath);
    
    // Serve assets with a cache-control headers for better performance
    app.use('/assets', express.static(assetsPath, {
      maxAge: '1y',
      immutable: true
    }));
    
    // Serve the rest of the static files
    app.use(express.static(distPath));
    
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
