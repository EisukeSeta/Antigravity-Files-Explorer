const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// コマンドライン引数からルートディレクトリを取得（指定がなければスクリプトの親ディレクトリをスキャン）
const scanDir = process.argv[2] ? path.resolve(process.argv[2]) : path.dirname(__filename);
const outputFileName = process.argv[3] || 'file_data.json';
const outputFilePath = path.join(path.dirname(__filename), outputFileName);
const configPath = path.join(path.dirname(__filename), 'config.json');

let config = { exclude: [] };

try {
    if (fs.existsSync(configPath)) {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
} catch (err) {
    console.error('Error loading config:', err);
}

function getFiles(dir, relativeDir = '') {
    const files = fs.readdirSync(dir);
    let results = [];

    files.forEach(file => {
        if (config.exclude.includes(file)) return;

        const fullPath = path.join(dir, file);
        const relPath = path.join(relativeDir, file).replace(/\\/g, '/'); // Web用にスラッシュにする
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            results.push({
                name: file,
                path: relPath,
                isDir: true,
                children: getFiles(fullPath, relPath)
            });
        } else {
            results.push({
                name: file,
                path: relPath,
                isDir: false,
                size: stats.size,
                ext: path.extname(file).toLowerCase()
            });
        }
    });

    return results;
}

try {
    console.log(`Scanning: ${scanDir}...`);
    const data = getFiles(scanDir);
    fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2));
    console.log(`Successfully generated ${outputFileName} at ${outputFilePath}`);
} catch (err) {
    console.error('Error scanning files:', err);
    process.exit(1);
}
