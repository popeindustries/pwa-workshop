# Step 8

The `Cache` API is a low-level API covering the storage and retrieval of `request`/`response` pairs. There are no mechanisms for limiting the total number of cached items, for example, or the purging of stale resources.

In general, it's good practice to always use unique (versioned) file paths for static resources, but some resources will inevitably require invalidation. JSON API data, for example, is often time dependant, requiring that you verify it's staleness before returning a cached `response`.

---
---

In this step, your task is to:

1. **verify that resources have not expired before returning a cached response**

Edit the `step8/sw.js` file with your installation code, and press the `T` key to see if you're ready for the next challenge (pressing the `I` key will re-open this window).

---
---