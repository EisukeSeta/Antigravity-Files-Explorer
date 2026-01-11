const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8000;
const ROOT_DIR = 'c:\\Win_tools\\Antigravity';

const server = http.createServer((req, res) => {
    // URLからクエリパラメータを削除
    const urlPath = req.url.split('?')[0];

    // API 端点: ファイルリストを更新する
    if (urlPath === '/api/update' && req.method === 'POST') {
        exec('node c:\\Win_tools\\Antigravity\\viewer\\update_files.js', (error, stdout, stderr) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: stderr }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Updated' }));
        });
        return;
    }

    // 静的ファイルのサービング
    let filePath = path.join(ROOT_DIR, urlPath === '/' ? 'viewer/index.html' : urlPath);

    // パスが viewer/ で始まらない場合は補完（ファイルリンク用）
    if (!urlPath.startsWith('/viewer/') && !urlPath.startsWith('/api/')) {
        filePath = path.join(ROOT_DIR, urlPath);
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js': contentType = 'text/javascript'; break;
        case '.css': contentType = 'text/css'; break;
        case '.json': contentType = 'application/json'; break;
        case '.jpg': contentType = 'image/jpeg'; break;
        case '.png': contentType = 'image/png'; break;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Internal error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/viewer/index.html`);
});
