/**
 * Add your solution code here.
 * When you're ready, press the 'T' key to test your solution.
 * Press the 'I' key to get more information on the current challenge.
 */

const ID = 'step10';
const ASSETS = ['index.css', 'index.js'];

self.addEventListener('install', event => {
  event.waitUntil(installation());
});

self.addEventListener('activate', event => {
  event.waitUntil(activation());
});

self.addEventListener('fetch', event => {
  if (shouldHandle(event.request)) {
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

    try {
      response = await fetch(request);
      if (shouldCache(request, response)) {
        cache.put(request.clone(), response.clone());
      }
      updateOnlineStatus(true);
    } catch (err) {
      response = new Response('', { status: 499, statusText: 'network offline' });
      updateOnlineStatus(false);
    }
  }

  return response.clone();
}

function shouldHandle(request) {
  const url = new URL(request.url);

  return request.method == 'GET' && (url.origin == location.origin || /nrk\.no$/.test(url.hostname));
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

function shouldCache(request, response) {
  if (response.ok) {
    return true;
  }

  const url = new URL(request.url);

  return response.type == 'opaque' && url.hostname == 'gfx-stage.nrk.no';
}

async function updateOnlineStatus(online) {
  const clients = await self.clients.matchAll();

  clients.forEach(client => {
    client.postMessage({ msg: online ? 'online' : 'offline' });
  });
}
