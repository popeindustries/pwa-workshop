# Step 7

In addition to the static assets cached during the **installation** phase, the `ServiceWorker` is able to cache resources as they are returned from the network at runtime. This is known as *runtime caching*, and in general, there are a few basic strategies available:

- **Cache-first**: respond with cached resource if available, otherwise return resource from network
- **Cache-only**: respond with cached resource, or error if not available
- **Network-first**: respond with network resource, or cached resource if network unavailable
- **Network-only**: respond with network resource only
- **Stale-while-revalidate**: respond with cached resource while simultaneously updating cached resource from network

The **Cache-first** strategy is probably the most common scenario:

```js
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

---
---

In this step, your tasks are to:

- **implement a *Cache-first* strategy**
- **cache all uncached network requests**

Edit the `step7/sw.js` file with your solution code, and press the `T` key to see if you're ready for the next challenge (pressing the `I` key will re-open this window).

---
---