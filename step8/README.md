# Step 8

As a result, it will likely be necessary to rely on some form of routing logic to determine how to handle different types of request:

```js
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (url.hostname == 'foo.com') {
    /* handle specific hosts */
  }
  if (/\.jpg$/.test(url.pathname)) {
    /* handle images */
  }
  if (event.request.headers.get('accept').includes('text/html')) {
    /* handle html */
  }
  /* allow everything else to go to the network */
});
```

---
---

In this step, your task is to:

1. **only cache responses for same-origin resources**

Edit the `step8/sw.js` file with your solution code, and press the `T` key to see if you're ready for the next challenge (pressing the `I` key will re-open this window).

---
---