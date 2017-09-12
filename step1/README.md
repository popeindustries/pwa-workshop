# Step 1

Although *PWA* is a concept bigger than a single API, many of the new capabilities are only possible because of `ServiceWorker`:

>A ***ServiceWorker*** is a script, installed via a web page, that runs in the background. It gives you the power to control **asset caching**, to handle requests from pages and workers when **offline**, and to respond to incoming **push notifications**.
>
>***ServiceWorker*** is a type of *Worker*, so it doesn't have access to the `DOM`, `AJAX`, or `localStorage`, but does have `postMessage` for communicating with clients, `fetch` for accessing the network, and `indexedDB` for storage.
>
> - [Service Workers: an introduction](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers)
> - [Using Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)
> - [Service Worker API](https://developer.mozilla.org/en/docs/Web/API/Service_Worker_API)

Note that `ServiceWorkers` are only supported on secure domains, and will not install without HTTPS (`localhost` being the exception).

### `ServiceWorker` registration

`ServiceWorker` is subject to a multi-stage lifecycle, starting with **registration** when the file is downloaded and executed. Registration is triggered via a call to [`navigator.serviceWorker.register()`](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register) from an active web page. After the file at `scriptURL` is downloaded, parsed, and executed, the installation process begins:

```js
navigator.serviceWorker.register('sw.js');
```

Because a `ServiceWorker` will be given control of all network requests from a web page, by default, the *scope* of control is determined by the physical location of `scriptURL`. If `scriptURL` is loaded from the root (`/sw.js`), the `ServiceWorker` will have control over all pages under the root domain. If `scriptURL` is loaded from `/assets/js`, it will only have control over pages living under `/assets/js`, etc.

Sometimes it may be desireable to restrict the scope of control by specifying a subpath in `options.scope` (`/en`, `/blog`, etc), but it's **not** possible to augment the scope of control if the `ServiceWorker` file is loaded from a subpath (`../` won't work).

Finally, repeated calls to `navigator.serviceWorker.register` will be treated as a no-op if the `ServiceWorker` at `scriptURL` + `options.scope` has already been registered.

---
---

In this first step, your task is to:

- **Register an empty `ServiceWorker`**

Edit the `step1/index.js` file with your registration code, and press the `T` key to see if you're ready for the next challenge (pressing the `I` key will re-open this window).

---
---

