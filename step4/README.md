# Step 4

A `ServiceWorker` is software that is *installed* on a user's device, and as a result, it carries with it all the difficulties associated with keeping remotely installed software updated to the lastest version. After a `ServiceWorker` has been successfully registered and installed, the browser will periodically check whether a newer version is available for download. Like all HTTP assets, `Cache-Control` headers will determine when this check will take place. Setting a `Cache-Control` of `no-cache` is the safest, but anything up to 24hrs is valid (the browser will ignore any `max-age` over 24hrs).

Regardless of how often the browser checks, in all cases the browser will only re-install a `ServiceWorker` if it is *byte* different from the previous version. In practice, this means it's necessary to use an invalidation mechanism that will change the contents of the file with each new release. This can be as simple as updating a string value in the file.

In the future, browsers will extend this byte-level check to files imported via [`importScripts`](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts), but until then, you can treat the `ServiceWorker` file as simple a boot loader by using `importScripts` with versioned file names.

---
---

In this step, your task is to:

1. **refactor sw.js to boot-load code from sw-index-v1.js**

Edit the `step4/sw.js` file with your installation code, and press the `T` key to see if you're ready for the next challenge (pressing the `I` key will re-open this window).

---
---