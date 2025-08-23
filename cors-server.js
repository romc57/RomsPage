const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8081;

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url);
    let pathname = `.${parsedUrl.pathname}`;
    
    // Default to index.html
    if (pathname === './') {
        pathname = './index.html';
    }

    try {
        const data = fs.readFileSync(pathname);
        const ext = path.parse(pathname).ext;
        const mimeType = mimeTypes[ext] || 'text/plain';
        
        res.setHeader('Content-Type', mimeType);
        res.writeHead(200);
        res.end(data);
    } catch (err) {
        res.writeHead(404);
        res.end('File not found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('This server includes CORS headers to allow GitHub API access');
});
