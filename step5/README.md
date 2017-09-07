# Step 5

Once successfully installed, the `ServiceWorker` will move to the **activation** phase if there isn't already a `ServiceWorker` controlling the page. If there is an earlier `ServiceWorker` version already running, the new `ServiceWorker` enters the **waiting** phase until the current one is no longer actively controlling clients (browser tabs or web workers). Similar to the need for rolling deployments when updating server applications, this phased update ensures that existing client sessions aren't disrupted.

If you are certain things won't break, it's possible to skip the waiting phase during an update, and take control immediately by calling `self.skipWaiting()` during the **installation** phase:

```js
self.addEventListener('install', event => {
  self.skipWaiting();
  /* pre-cache assets */
});
```

In either case, the `ServiceWorker` will eventually move on to the **activation** phase, where it will be possible to control new clients. The `ServiceWorker` will be notified via the `activate` event, and can use this opportunity to clean up after the previous version by deleting old caches and/or migrating databases:

```js
self.addEventListener('activate', event => {
  event.waitUntil(/* Promise to clean up */);
});

```

---
---

In this step, your task is to:

- **add an `activate` handler and remove the 'step5-old' cache**

Edit the `step5/sw-index-v1.js` file with your solution code, and press the `T` key to see if you're ready for the next challenge (pressing the `I` key will re-open this window).

---
---