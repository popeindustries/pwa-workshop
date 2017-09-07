# Step 6

Once the `ServiceWorker` has beeen registerd, installed, and activated, it is finally ready to begin handling requests from connected clients. When a controlled page or web worker makes a network request, the `ServiceWorker` will be notified via the `fetch` event, and may respond with a cached response, a synthetic response, or allow the request to continue out to the network.

To respond to an incoming `request` (available as `event.request`), pass a promise that resolves with a `response` to the `event.respondWith()` method:

```js
self.addEventListener('fetch', event => {
  event.respondWith(/* Promise for a response */);
});
```

---
---

In this step, your task is to:

- **return a pre-cached response for a request**

Edit the `step6/sw-index-v1.js` file with your solution code, and press the `T` key to see if you're ready for the next challenge (pressing the `I` key will re-open this window).

---
---