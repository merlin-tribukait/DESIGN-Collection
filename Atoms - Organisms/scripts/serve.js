/**
 * Zero-dependency Node.js HTTP Server for Aetheris Design System & Documentation
 * Serves static files from dist/ with clean URL resolution, MIME typing, and port failover.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.txt': 'text/plain; charset=utf-8'
};

function resolveFilePath(reqPath) {
  // Normalize and decode URL path
  let decodedPath = '';
  try {
    decodedPath = decodeURIComponent(reqPath);
  } catch (e) {
    decodedPath = reqPath;
  }

  // Remove leading slash and strip query params
  const cleanPath = decodedPath.replace(/^\/+/, '');
  const targetPath = path.join(DIST_DIR, cleanPath);

  // Security check: ensure path is within DIST_DIR
  if (!targetPath.startsWith(DIST_DIR)) {
    return null;
  }

  // Case 1: Exact file exists
  if (fs.existsSync(targetPath) && fs.statSync(targetPath).isFile()) {
    return targetPath;
  }

  // Case 2: Directory with index.html (e.g. / or /docs/)
  if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()) {
    const indexPath = path.join(targetPath, 'index.html');
    if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) {
      return indexPath;
    }
  }

  // Case 3: Clean URL without .html (e.g. /styleguide -> /styleguide.html)
  const htmlPath = targetPath + '.html';
  if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
    return htmlPath;
  }

  return null;
}

function render404Page(reqPath) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 Not Found | Aetheris Design System</title>
  <link rel="stylesheet" href="/assets/css/styleguide.css">
  <style>
    body {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: #0B0D0E;
      color: #F4F5F6;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      text-align: center;
      padding: 24px;
    }
    .box {
      background: #14171A;
      border: 1px solid #2A333C;
      border-radius: 16px;
      padding: 48px;
      max-width: 480px;
      box-shadow: 0 12px 32px rgba(0,0,0,0.6);
    }
  </style>
</head>
<body>
  <div class="box">
    <div style="font-family: 'berkeleyMono', monospace; font-size: 48px; font-weight: 700; color: #FF6901; margin-bottom: 12px;">404</div>
    <h1 style="font-size: 24px; margin-bottom: 8px;">Resource Not Found</h1>
    <p style="color: #8E98A3; font-size: 14px; margin-bottom: 24px;">The requested path <code>${reqPath}</code> was not found on the local server.</p>
    <a href="/index.html" class="ax-btn ax-btn-primary" style="display: inline-block; padding: 10px 20px; background: #FF6901; color: #FFF; border-radius: 8px; text-decoration: none; font-weight: 600;">Back to Overview</a>
  </div>
</body>
</html>`;
}

function createServer(port) {
  const server = http.createServer((req, res) => {
    const startTime = process.hrtime();
    const parsedUrl = url.parse(req.url);
    const reqPath = parsedUrl.pathname;

    const filePath = resolveFilePath(reqPath);

    if (filePath) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      fs.readFile(filePath, (err, data) => {
        const diff = process.hrtime(startTime);
        const durationMs = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);

        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('500 Internal Server Error');
          console.error(`[${new Date().toISOString()}] 500 ${req.method} ${reqPath} (${durationMs}ms)`);
          return;
        }

        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Length': data.length,
          'Cache-Control': 'no-cache'
        });
        res.end(data);
        console.log(`[${new Date().toISOString()}] 200 ${req.method} ${reqPath} (${durationMs}ms) -> ${path.basename(filePath)}`);
      });
    } else {
      const diff = process.hrtime(startTime);
      const durationMs = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);

      const notFoundHtml = render404Page(reqPath);
      res.writeHead(404, {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Length': Buffer.byteLength(notFoundHtml)
      });
      res.end(notFoundHtml);
      console.log(`[${new Date().toISOString()}] 404 ${req.method} ${reqPath} (${durationMs}ms)`);
    }
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️  Port ${port} is occupied, falling back to port ${port + 1}...`);
      createServer(port + 1);
    } else {
      console.error(`Server error:`, err);
    }
  });

  server.listen(port, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 Aetheris Living Design System Server is running!`);
    console.log(`======================================================`);
    console.log(`  Local:            http://localhost:${port}/`);
    console.log(`  Style Guide:      http://localhost:${port}/styleguide`);
    console.log(`  Animations:       http://localhost:${port}/animations`);
    console.log(`  Device Simulator: http://localhost:${port}/devices`);
    console.log(`  Documentation:    http://localhost:${port}/docs/AETHERIS_DESIGN_REPORT`);
    console.log(`======================================================`);
    console.log(`Serving static files from: ${DIST_DIR}`);
    console.log(`Press Ctrl+C to stop.\n`);
  });
}

createServer(DEFAULT_PORT);
