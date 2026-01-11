const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = 'c:\\Win_tools\\Antigravity';
const outputFilePath = path.join(rootDir, 'viewer', 'file_data.json');

function getFiles(dir, relativeDir = '') {
    const files = fs.readdirSync(dir);
    let results = [];

    files.forEach(file => {
        if (file === 'viewer' || file === '.git' || file === 'node_modules') return;

        const fullPath = path.join(dir, file);
        const relPath = path.join(relativeDir, file);
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
    const data = getFiles(rootDir);
    fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2));
    console.log('File data updated successfully.');
} catch (err) {
    console.error('Error scanning files:', err);
    process.exit(1);
}
