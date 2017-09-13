# Step 11

Returning cached resources from a `ServiceWorker` will (almost) always lead to a significant performance improvement, with the added bonus of working seamlessly on or offline.

In cases where an html request is not cached and the network is unavailable, the `ServiceWorker` can respond with a pre-cached fallback page, or even a dynamically rendered template.

---
---

In this step, your task is to:

- **return an offline page for html requests when offline**
- **BONUS: return an offline fallback image for jpg requests when offline**

Edit the `step11/sw-index-v1.js` file with your solution code, and press the `T` key to see if you're ready for the next challenge (pressing the `I` key will re-open this window).

---
---