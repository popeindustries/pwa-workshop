# Step 7

In addition to the static assets cached during the **installation** phase, the `ServiceWorker` is able to cache resources as they are returned from the network at runtime. This is known as *runtime caching*, and in general, there are 4 basic strategies available:

1. **Cache-first**:
2. **Cache-only**
3. **Network-first**:
4. **Network-only**: only return fresh network responses
5. **Stale-while-revalidate**: respond with cached resource while simultaneously updating cached resource from network

The **network-first** strategy is probably the most common scenario, but in most cases, it will be necessary to rely on some form of routing logic to determine how to handle different types of request.

---
---

In this step, your task is to:

1. **only cache responses for same-origin resources**

Edit the `step7/sw.js` file with your solution code, and press the `T` key to see if you're ready for the next challenge (pressing the `I` key will re-open this window).

---
---