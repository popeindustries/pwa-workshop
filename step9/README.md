# Step 9

The `Cache` API is a low-level API that only covers the storage and retrieval of `request`/`response` pairs. There are no mechanisms for limiting the total number of cached items, for example, or the purging of stale resources.

In general, it's good practice to always use unique (versioned) file paths for static resources, but some resources will inevitably require invalidation. JSON API data, for example, is often time dependant, requiring that you verify it's staleness before returning a cached `response`:

```js
async function respond(request) {
  let response = await caches.match(request);

  if (!response || hasExpired(response)) {
    response = await fetch(request);
    /* update cached resource */
  }

  return response;
}
```

---
---

In this step, your task is to:

1. **verify that resources have not expired before returning a cached response**

Edit the `step8/sw-index-v1.js` file with your solution code, and press the `T` key to see if you're ready for the next challenge (pressing the `I` key will re-open this window).

---
---