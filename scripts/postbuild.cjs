require('dotenv/config');
const fs = require('fs');
const path = require('path');

const files = [
  '../dist/index.html',
  '../dist/service-worker.js'
];

for (const filename of files) {
  const filePath = path.resolve(__dirname, filename);
  let file = fs.readFileSync(filePath, 'utf8');
  file = file.replace('__CACHE_KEY__', `CACHE_${process.env.VITE_APP_VERSION}`);
  fs.writeFileSync(filePath, file);

  console.log(`${filePath} was modified successfully.`);
}