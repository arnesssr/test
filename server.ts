import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();
  const isProd = process.env.NODE_ENV === 'production';

  let vite: any;

  if (!isProd) {
    // Create Vite server in middleware mode
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    // Use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    // In production, serve static files
    app.use(express.static(path.resolve(__dirname, 'dist/client')));
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      let template: string;
      let render: (url: string) => string;

      if (!isProd) {
        // Always read fresh template in dev
        template = fs.readFileSync(
          path.resolve(__dirname, 'index.html'),
          'utf-8',
        );

        // Transform the template HTML with Vite
        template = await vite.transformIndexHtml(url, template);

        // Load the server entry
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        // In production, read pre-built files
        template = fs.readFileSync(
          path.resolve(__dirname, 'dist/client/index.html'),
          'utf-8',
        );

        const serverModule = await import('./dist/server/entry-server.js');
        render = serverModule.render;
      }

      const appHtml = render(url);

      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e: any) {
      vite?.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

createServer();
