const ASSETS = [
  'index.css',
  'index.js'
];

self.addEventListener('install', event => {
  event.waitUntil(async () => {
    const cache = await caches.open(ID);
    return cache.addAll(ASSETS);
  });
});
