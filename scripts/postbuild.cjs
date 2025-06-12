require('dotenv/config');
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../dist/index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Replace placeholder
html = html.replace('__CACHE_KEY__', `CACHE_${process.env.VITE_APP_VERSION}`);

// Write back to file
fs.writeFileSync(filePath, html);

console.log('index.html was modified successfully.');