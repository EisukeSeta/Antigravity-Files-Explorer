const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8000;

// 公開するルートディレクトリ（Antigravity直下）
const baseDir = path.join(__dirname, '..');

const server = http.createServer((req, res) => {
    // CORSを許可するヘッダーを追加
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    console.log(`${new Date().toLocaleTimeString()} - Request: ${req.url}`);

    // URLからパスを解析
    let filePath = path.join(baseDir, req.url.split('?')[0]);
    
    // ディレクトリの場合は index.html を探す
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm',
        '.md': 'text/markdown',
        '.ps1': 'text/plain',
        '.sh': 'text/plain'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code == 'ENOENT') {
                console.log(`❌ Not Found: ${filePath}`);
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, () => {
    console.log(`========================================`);
    console.log(`🚀 Local File Server for Antigravity`);
    console.log(`========================================`);
    console.log(`Root Directory: ${baseDir}`);
    console.log(`Server running at: http://localhost:${port}/`);
    console.log(`CORS is enabled for all origins.`);
    console.log(`========================================`);
});
