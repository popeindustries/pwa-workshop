# Step 6

Once the `ServiceWorker` has beeen registerd, installed, and activated, it is ready to begin handling requests from connected clients. When a controlled page or web worker makes a network request, the `ServiceWorker` will be notified via the `fetch` event, and may respond with a cached response, a synthetic response, or allow the request to continue out to the network.

---
---

In this step, your task is to:

1. **return a cached response for a request to one of the assets pre-cached during install**

Edit the `step6/sw.js` file with your installation code, and press the `T` key to see if you're ready for the next challenge (pressing the `I` key will re-open this window).

---
---