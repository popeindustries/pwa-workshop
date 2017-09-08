/**
 * Add your solution code here.
 * When you're ready, press the 'T' key to test your solution.
 * Press the 'I' key to get more information on the current challenge.
 */

const ID = 'step9';
const ASSETS = ['index.css', 'index.js'];

self.addEventListener('install', event => {
  event.waitUntil(installation());
});

self.addEventListener('activate', event => {
  event.waitUntil(activation());
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (url.origin == location.origin) {
    event.respondWith(respond(event.request));
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

async function respond(request) {
  let response = await caches.match(request);

  if (!response || hasExpired(response)) {
    const cache = await caches.open(ID);

    response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
  }

  return response;
}

function hasExpired(response) {
  const cacheControl = response.headers.get('Cache-Control');

  if (!cacheControl) {
    return false;
  }

  const date = response.headers.get('Date');
  const maxAge = /max-age=(\d+)$/.exec(cacheControl);
  const expires = +new Date(date) + (maxAge && maxAge[1] ? parseInt(maxAge[1], 10) * 1000 : 0);

  return Date.now() > expires;
}
