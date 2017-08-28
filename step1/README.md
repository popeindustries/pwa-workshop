# Step 1

*Progressive Web Apps (PWA)* are web experiences that are **reliable** under poor or non-existant network connections; are **fast and responsive** to user interaction; and are as **engaging** as native, downloadable apps.

Adding a `ServiceWorker` is the key to turning a normal, boring web experience into a reliable and engaging one.

>A ***ServiceWorker*** is a script, installed via a web page, that runs in the background. It gives you the power to control **asset caching**, to handle requests from pages and workers when **offline**, and to respond to incoming **push notifications**.
>
>***ServiceWorker*** is a type of *Worker*, so it doesn't have access to the `DOM`, `AJAX`, or `localStorage`, but does have `postMessage` for communicating with clients, `fetch` for accessing the network, and `indexedDB` for storage.

## Requirements

`ServiceWorker` is subject to a 5-stage lifecycle, starting with **registration** when the file is downloaded and executed.

In this first step, your goal is to **register an empty `ServiceWorker` file after the TBNN home page loads**.

- `navigator.serviceWorker.register()`
- scopes
