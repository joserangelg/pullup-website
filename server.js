const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { URL } = require('node:url');

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'dist');
const fallbackFile = path.join(publicDir, 'index.html');
const waitlistWebhookUrl = process.env.WAITLIST_WEBHOOK_URL || 'https://formspree.io/f/mojbjkbn';

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
};

function sendFile(response, filePath) {
  fs.readFile(filePath, (error, contents) => {
    if (error) {
      response.writeHead(error.code === 'ENOENT' ? 404 : 500, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end(error.code === 'ENOENT' ? 'Not found' : 'Server error');
      return;
    }

    response.writeHead(200, {
      'Content-Type': mimeTypes[path.extname(filePath)] || 'application/octet-stream',
      'Cache-Control': filePath.endsWith('index.html') ? 'no-cache' : 'public, max-age=31536000, immutable'
    });
    response.end(contents);
  });
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-cache'
  });
  response.end(JSON.stringify(payload));
}

function readRequestBody(request, callback) {
  let body = '';

  request.on('data', (chunk) => {
    body += chunk;

    if (body.length > 10000) {
      request.destroy();
    }
  });

  request.on('end', () => callback(body));
}

function parseWaitlistPayload(body, contentType) {
  if (contentType.includes('application/json')) {
    return JSON.parse(body || '{}');
  }

  const params = new URLSearchParams(body);
  return Object.fromEntries(params.entries());
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function handleWaitlist(request, response) {
  if (request.method !== 'POST') {
    sendJson(response, 405, { error: 'Method not allowed' });
    return;
  }

  readRequestBody(request, async (body) => {
    let payload;

    try {
      payload = parseWaitlistPayload(body, request.headers['content-type'] || '');
    } catch (error) {
      sendJson(response, 400, { error: 'Invalid waitlist submission' });
      return;
    }

    const emailOrPhone = String(payload.emailOrPhone || '').trim();

    if (!emailOrPhone) {
      sendJson(response, 400, { error: 'Email or phone is required' });
      return;
    }

    const formspreePayload = {
      emailOrPhone,
      source: 'pullupapp.co',
      submittedAt: new Date().toISOString()
    };

    if (isEmail(emailOrPhone)) {
      formspreePayload.email = emailOrPhone;
    }

    try {
      const webhookResponse = await fetch(waitlistWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formspreePayload)
      });

      if (!webhookResponse.ok) {
        throw new Error(`Webhook responded with ${webhookResponse.status}`);
      }

      sendJson(response, 200, { ok: true });
    } catch (error) {
      console.error('Waitlist webhook failed:', error);
      sendJson(response, 502, { error: 'Waitlist submission failed' });
    }
  });
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);

  if (url.pathname === '/api/waitlist') {
    handleWaitlist(request, response);
    return;
  }

  const decodedPath = decodeURIComponent(url.pathname);
  const requestedPath = decodedPath === '/' ? '/index.html' : decodedPath;
  const filePath = path.normalize(path.join(publicDir, requestedPath));

  if (!filePath.startsWith(publicDir)) {
    response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Forbidden');
    return;
  }

  fs.stat(filePath, (error, stats) => {
    if (!error && stats.isFile()) {
      sendFile(response, filePath);
      return;
    }

    sendFile(response, fallbackFile);
  });
});

server.listen(port, () => {
  console.log(`PullUp site listening on port ${port}`);
});
