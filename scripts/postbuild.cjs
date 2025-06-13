require('dotenv/config');
const fs = require('fs');
const path = require('path');

const files = [
  '../dist/index.html',
  '../dist/service-worker.js'
];

(async () => {
  let APP_VERSION;
  try {
    const urlVersion = `${process.env.VITE_API_VERSION_SERVER}version/`;
    const res = await fetch(urlVersion);
    APP_VERSION = await res.text();      
  } catch (error) {
    console.error('Version was not fetched.');
  }

  if (!APP_VERSION) {
    return;
  }

  console.log('Version:', APP_VERSION);

  for (const filename of files) {
    const filePath = path.resolve(__dirname, filename);
    let file = fs.readFileSync(filePath, 'utf8');
    file = file.replace('__APP_VERSION__', APP_VERSION);
    file = file.replace('__CACHE_KEY__', `CACHE_${APP_VERSION}`);
    fs.writeFileSync(filePath, file);

    console.log(`${filePath} was modified successfully.`);
  }
})();