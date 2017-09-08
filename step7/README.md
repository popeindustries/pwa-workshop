# Step 7

When responding to a request, you will need to choose from one of the following basic response strategies:

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

### Runtime caching

In addition to the static dependencies cached during the **installation** phase, the `ServiceWorker` is able to cache resources as they are returned from the network at runtime. It's important to note, however, that the `body` of a `response` object can only be read **once**. As a result, you should call `clone()` on the instance returned from `fetch` when caching a response:

```js
cache.put(request, response.clone());
```

---
---

In this step, your tasks are to:

- **implement a *Cache-first* strategy**
- **cache all uncached network requests**

Edit the `step7/sw-index-v1.js` file with your solution code, and press the `T` key to see if you're ready for the next challenge (pressing the `I` key will re-open this window).

---
---