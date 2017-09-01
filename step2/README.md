# Step 2

After a `ServiceWorker` has been registered, it enters the **installation** phase. The `ServiceWorker` will be notified via the `install` event, and at this point will have the opportunity to load and pre-cache any static assets.

### `event.waitUntil()`

The lifetime of the `event` passed to the `install` event handler can be extended by passing a Promise to [`event.waitUntil(promise)`](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil). In this way, the `ServiceWorker` can delay resolution of the `install` event until some async work is finished.

### `Cache` API

The `Cache` API is one of the most important new features available to `ServiceWorkers`.

---
---

In this step, your task is to:

1. **pre-cache assets**

Edit the `step2/sw.js` file with your installation code, and press the `T` key to see if you're ready for the next challenge (pressing the `I` key will re-open this window).

---
---