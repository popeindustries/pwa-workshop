# Step 5

Once successfully installed, the `ServiceWorker` will move to the **activation** phase if there isn't already a `ServiceWorker` controlling the page. If there is an earlier `ServiceWorker` version already running, the new `ServiceWorker` enters the **waiting** phase until the current one is no longer actively controlling clients (browser tabs or web workers). Similar to the need for rolling deployments when updating server applications, this phased update ensures that existing client sessions aren't disrupted.

If you are certain things won't break, it's possible to skip the waiting phase during an update, and take control immediately by calling `self.skipWaiting()` during the **install** phase.

The `ServiceWorker` then moves on to the **activation** phase, where it is now able to control new clients. The `ServiceWorker` will be notified via the `activate` event, and can use this opportunity to clean up after the previous version by deleting old caches and/or migrating databases.

---
---

In this step, your task is to:

1. **add an `activate` handler and remove old caches**

Edit the `step5/sw.js` file with your installation code, and press the `T` key to see if you're ready for the next challenge (pressing the `I` key will re-open this window).

---
---