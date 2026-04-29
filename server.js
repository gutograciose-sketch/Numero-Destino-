import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Em ESM, precisamos definir __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware para logs (ajuda no debug do Hostinger se o log estiver ativo)
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

  // Rotas de API devem vir ANTES do Vite/Static
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", environment: process.env.NODE_ENV });
  });

  if (process.env.NODE_ENV !== "production") {
    // Configuração para ambiente de DESENVOLVIMENTO (AI Studio Preview)
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Configuração para ambiente de PRODUÇÃO (Hostinger)
    const distPath = path.resolve(__dirname, 'dist');
    
    // Serve arquivos estáticos da pasta dist
    app.use(express.static(distPath));
    
    // Fallback para SPA: Todas as rotas que não forem arquivos devem retornar o index.html
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    if (process.env.NODE_ENV === "production") {
      console.log(`Servindo arquivos de: ${path.resolve(__dirname, 'dist')}`);
    }
  });
}

startServer().catch((err) => {
  console.error("Erro ao iniciar o servidor:", err);
  process.exit(1);
});
