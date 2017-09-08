self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Make sure some files aren't cached
  if (/^\/test|^\/info|\/manifest.json$/.test(url.pathname)) {
    event.respondWith(fetch(event.request));
  }
});
