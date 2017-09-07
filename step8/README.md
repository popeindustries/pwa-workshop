# Step 7

In addition to the static assets cached during the **installation** phase, the `ServiceWorker` is able to cache resources as they are returned from the network at runtime. This is known as *runtime caching*, and in general, there are a few basic strategies available:

- **Cache-first**: respond with cached resource if available, otherwise return resource from network
- **Cache-only**: respond with cached resource, or error if not available
- **Network-first**: respond with network resource, or cached resource if network unavailable
- **Network-only**: respond with network resource only
- **Stale-while-revalidate**: respond with cached resource while simultaneously updating cached resource from network

The **Cache-first** strategy is probably the most common scenario, but most applications will likely combine more than one strategy. As a result, it will likely be necessary to rely on some form of routing logic to determine how to handle different types of request:

```js
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (url.hostname == 'foo.com') {
    /* handle specific hosts */
  }
  if (/\.jpg$/.test(url.pathname)) {
    /* handle images */
  }
  if (event.request.headers.get('accept').includes('text/html')) {
    /* handle html */
  }
  /* allow everything else to go to the network */
});
```

---
---

In this step, your task is to:

1. **only cache responses for same-origin resources**

Edit the `step7/sw.js` file with your solution code, and press the `T` key to see if you're ready for the next challenge (pressing the `I` key will re-open this window).

---
---