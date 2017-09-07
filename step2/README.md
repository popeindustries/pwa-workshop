# Step 2

 By default, when a web page registers a `ServiceWorker` on first visit, the page will not come under `ServiceWorker` control until after a full refresh (second visit). Any cpu/network activity triggered by `ServiceWorker` registration will therefore contend with page loading, negatively impacting the crucial first visit experience.

 `ServiceWorkers` are rarely *required*, and should be treated as a progressive enhancement, so delay `ServiceWorker` registration until **after** the page has loaded/initialized.

---
---

In this step, your task is to:

- **Register an empty `ServiceWorker` after the application has triggered the `ready` event on `window`**

Edit the `step2/index.js` file with your registration code, and press the `T` key to see if you're ready for the next challenge (pressing the `I` key will re-open this window).

---
---

