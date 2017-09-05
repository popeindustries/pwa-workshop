const ID = 'step4';
const ASSETS = ['index.css', 'index.js'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(ID).then(cache => cache.addAll(ASSETS)));
});
