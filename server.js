import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Em ESM, precisamos definir __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Determina se é produção (checa se contém 'prod' para ser flexível com o que o Hostinger envia)
  const isProduction = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase().includes('prod');

  // Middleware para logs (ajuda no debug do Hostinger se o log estiver ativo)
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // Rotas de API devem vir ANTES do Vite/Static
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      environment: process.env.NODE_ENV,
      port: PORT,
      isProduction
    });
  });

  if (!isProduction) {
    // Configuração para ambiente de DESENVOLVIMENTO (AI Studio Preview)
    console.log("Iniciando em modo DESENVOLVIMENTO...");
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Configuração para ambiente de PRODUÇÃO (Hostinger)
    const distPath = path.resolve(__dirname, 'dist');
    console.log(`Iniciando em modo PRODUÇÃO. Servindo de: ${distPath}`);
    
    // Serve arquivos estáticos da pasta dist
    app.use(express.static(distPath));
    
    // Fallback para SPA: Todas as rotas que não forem arquivos devem retornar o index.html
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'), (err) => {
        if (err) {
          console.error("Erro ao enviar index.html:", err);
          res.status(404).send("Arquivo index.html não encontrado. Certifique-se de que rodou 'npm run build'.");
        }
      });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
    console.log(`Variável NODE_ENV: "${process.env.NODE_ENV}"`);
  });
}

startServer().catch((err) => {
  console.error("Erro ao iniciar o servidor:", err);
  process.exit(1);
});
