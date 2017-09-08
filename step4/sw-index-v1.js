const ID = 'step4';
const ASSETS = ['index.css', 'index.js'];

self.addEventListener('install', event => {
  event.waitUntil(insallation());
});

async function insallation() {
  const cache = await caches.open(ID);
  return cache.addAll(ASSETS);
}