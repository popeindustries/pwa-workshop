# Step 10

Like all workers, `ServiceWorkers` can only indirectly send and receive messages from connected clients via the [Channel Messaging API](https://developer.mozilla.org/developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API). Though cumbersome to work with, Channel Messaging enables a `ServiceWorker` to receive messages from an individual client, to send messages to individual clients, or to broadcast messages to all clients.

One useful scenario for messaging is for a `ServiceWorker` to broadcast online/offline status. Although the `navigator.onLine` property will correctly indicate when there is no network connection (value is `false`), it will **not** cover situations where the network or remote servers are unreachable (no internet, "li-fi", etc.). When performing a `fetch` request, for example, the `ServiceWorker` could notify clients if successful/unsuccessful (note that `fetch()` requests do not reject on server errors, only permission or network errors):

```js
try {
  response = await fetch(request);
  updateOnlineStatus(true);
} catch (err) {
  response = new Response('', { status: 499, statusText: 'network offline' });
  updateOnlineStatus(false);
}
```

---
---

In this step, your task is to:

- **track network status and notify clients when online status changes**
- **BONUS: add a status banner when offline**

Edit the `step10/sw-index-v1.js` file with your solution code, and press the `T` key to see if you're ready for the next challenge (pressing the `I` key will re-open this window).

---
---