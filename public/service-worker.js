const CACHE_KEY = '__CACHE_KEY__';
const cacheFiles = [
  '/',
  '/index.html',
];

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installed', event);

  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_KEY).then(cache => {
      return cache.addAll(cacheFiles);
    })
  );  
});

self.addEventListener('activate', (event) => {
  clients.claim(); // take control of pages
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_KEY).map(k => caches.delete(k))
      );
    })
  );
  console.log('[Service Worker] Activated', event);
});

self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] fetch:', event.request);
  event.respondWith(fetch(event.request));
});