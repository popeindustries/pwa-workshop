/**
 * Add your solution code here.
 * When you're ready, press the 'T' key to test your solution.
 * Press the 'I' key to get more information on the current challenge.
 */

const ID = 'step6';
const ASSETS = ['index.css', 'index.js'];

self.addEventListener('install', event => {
  event.waitUntil(installation());
});

self.addEventListener('activate', event => {
  event.waitUntil(activation());
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (/index\.[jc]ss?$/.test(url.pathname)) {
    event.respondWith(caches.match(event.request));
  }
});

async function installation() {
  const cache = await caches.open(ID);
  return cache.addAll(ASSETS);
}

async function activation() {
  const keys = await caches.keys();

  await Promise.all(
    keys.map(key => {
      if (key != ID) {
        return caches.delete(key);
      }
    })
  );
}
