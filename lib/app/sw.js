self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Make sure test file isn't cached
  if (/^\/(?:test|info)/.test(url.pathname)) {
    event.respondWith(fetch(event.request));
  }
});
