(function() {
  window.sleep = sleep;
  window.unregister = unregister;
  window.cleanCaches = cleanCaches;
  window.clean = clean;
  window.shouldClean = shouldClean;
  window.triggerReady = triggerReady;
  window.load = load;
  window.unload = unload;
  window.prepareForTesting = prepareForTesting;
  window.getRegistrationAtState = getRegistrationAtState;

  function load(url) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${url}"]`)) {
        return resolve();
      }

      const script = document.createElement('script');
      const first = document.getElementsByTagName('script')[0];

      script.async = true;
      script.src = url;

      script.onload = function() {
        resolve();
        script.onload = script.onerror = null;
      };
      script.onerror = function(err) {
        reject(err);
        script.onload = script.onerror = null;
      };

      // Insert
      first.parentNode.insertBefore(script, first);
    });
  }

  function unload(url) {
    const element = document.querySelector(`script[src="${url}"]`);

    if (element) {
      element.parentElement.removeChild(element);
    }
  }

  function triggerReady() {
    window.dispatchEvent(new Event('ready'));
    return sleep(200);
  }

  function sleep(duration) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, duration);
    });
  }

  function unregister() {
    return navigator.serviceWorker.getRegistrations().then(registrations => {
      return Promise.all(registrations.map(registration => registration.unregister()));
    });
  }

  function cleanCaches() {
    return window.caches.keys().then(keys => {
      return Promise.all(keys.map(key => window.caches.delete(key)));
    });
  }

  function clean() {
    return Promise.all([unregister(), cleanCaches()]);
  }

  function shouldClean() {
    return Promise.all([
      navigator.serviceWorker.getRegistrations(),
      window.caches.keys()
    ]).then(([registrations, caches]) => {
      return registrations.length > 0 || caches.length > 0;
    });
  }

  async function getRegistrationAtState(state) {
    return new Promise(async (resolve, reject) => {
      const registration = await navigator.serviceWorker.getRegistration();

      if (!registration) {
        return reject(Error('no ServiceWorker registered'));
      }

      if (
        (state == 'installed' && (registration.waiting || registration.active)) ||
        (state == 'activated' && registration.active)
      ) {
        return resolve(registration);
      }

      const sw = registration.installing || registration.waiting || registration.active;
      const onStateChange = evt => {
        if (evt.target.state == state) {
          sw.removeEventListener('statechange', onStateChange);
          resolve(registration);
          return;
        }
        if (evt.target.state == 'redundant') {
          sw.removeEventListener('statechange', onStateChange);
          reject(Error('installing ServiceWorker has become redundant'));
        }
      };

      sw.addEventListener('statechange', onStateChange);
    });
  }

  async function prepareForTesting() {
    if (await shouldClean()) {
      await clean();
      window.location.reload();
      throw Error('reloading');
    }
  }
})();
