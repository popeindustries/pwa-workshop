# Step 3

After a `ServiceWorker` has been registered, it enters the **installation** phase. The `ServiceWorker` will be notified via the `install` event, and at this point will have the opportunity to load and pre-cache any static assets.

### `Cache` API

The [`Cache`](https://developer.mozilla.org/en-US/docs/Web/API/Cache) API is one of the most important new features available to `ServiceWorkers`, providing a low-level API for the storage of `request`/`response` pairs. A `ServiceWorker` has access to any number of named `Cache` objects via the [`CacheStorage`](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) API, exposed to a `ServiceWorker` as the `caches` global property.

During the `install` event, it is common practice to create a new, uniquely named `cache` instance, and populate that instance with any number of static assets needed by the controlled page(s) (js, css, images, etc.). The [`cache.addAll(Array<String>): Promise`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/addAll) method makes this kind of batch caching trivial.

There are no APIs for managing caches or their contents, so it is your reponsibility to create, update, and delete caches and their contents as necessary.

### `event.waitUntil()`

The lifetime of the `event` passed to the `install` event handler can be extended by passing a Promise to [`event.waitUntil(promise)`](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil). In this way, the `ServiceWorker` can delay resolution of the `install` event until some async work (`cache.addAll()` perhaps?) is finished.

---
---

In this step, your task is to:

1. **pre-cache `index.{css,js}` assets on install**

Edit the `step3/sw.js` file with your installation code, and press the `T` key to see if you're ready for the next challenge (pressing the `I` key will re-open this window).

---
---