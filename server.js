import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Em ESM, precisamos definir __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Melhora a detecção de produção sendo insensível a maiúsculas/minúsculas e caracteres extras (como o ponto final no print)
  const rawNodeEnv = (process.env.NODE_ENV || "").toLowerCase();
  const isProduction = rawNodeEnv.includes("prod") || rawNodeEnv.includes("production");

  // Middleware para logs (ajuda no debug do Hostinger se o log estiver ativo)
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // Rota de debug para ajudar a encontrar os arquivos no Hostinger
  app.get("/api/debug-paths", (req, res) => {
    try {
      const info = {
        __dirname,
        cwd: process.cwd(),
        node_env: process.env.NODE_ENV,
        isProduction,
        files_in_dirname: fs.readdirSync(__dirname),
        files_in_cwd: fs.readdirSync(process.cwd()),
      };
      res.json(info);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
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
    const possiblePaths = [
      path.resolve(__dirname, 'dist'),
      path.resolve(process.cwd(), 'dist'),
      __dirname,
      process.cwd(),
    ];
    
    let distPath = possiblePaths[0];
    let indexPath = '';

    for (const p of possiblePaths) {
      const testPath = path.join(p, 'index.html');
      if (fs.existsSync(testPath)) {
        distPath = p;
        indexPath = testPath;
        break;
      }
    }

    if (!indexPath) indexPath = path.join(distPath, 'index.html');
    
    console.log(`[PROD] Servindo arquivos de: ${distPath}`);
    console.log(`[PROD] Caminho do index.html: ${indexPath}`);
    
    // Serve arquivos estáticos da pasta detectada
    app.use(express.static(distPath));
    
    // Fallback para SPA: Todas as rotas que não forem arquivos devem retornar o index.html
    app.get('*', (req, res) => {
      res.sendFile(indexPath, (err) => {
        if (err) {
          console.error(`[ERRO] Falha ao enviar index.html: ${indexPath}`);
          res.status(404).send("Erro: index.html não encontrado no servidor.");
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
