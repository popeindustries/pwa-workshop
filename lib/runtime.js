(function() {
  const step = parseInt(/step(\d+)/.exec(window.location.pathname)[1], 10);
  const storedProgress = localStorage.getItem('progress');
  const progress = storedProgress ? JSON.parse(storedProgress) : [];
  let isTest = false;
  let activeOverlay, infoElement, testElement;

  window.sleep = sleep;
  window.setProgress = setProgress;
  window.unregister = unregister;
  window.cleanCaches = cleanCaches;
  window.clean = clean;
  window.shouldClean = shouldClean;
  window.triggerReady = triggerReady;
  window.load = load;
  window.unload = unload;

  // Enable mocha grepping
  if (/grep/.test(window.location.search) || window.location.hash === '#test') {
    isTest = true;
    test();
  }
  if (window.location.hash === '#info') {
    info();
  }
  // First visit
  if (progress[step - 1] == null) {
    info();
    progress[step - 1] = 0;
  }

  localStorage.setItem('progress', JSON.stringify(progress));

  if (!isTest) {
    load('index.js').then(triggerReady);
  }

  function load(script) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${script}"]`)) {
        return resolve();
      }
      window.loadScript(script, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  function unload(script) {
    const element = document.querySelector(`script[src="${script}"]`);

    if (element) {
      element.parentElement.removeChild(element);
    }
  }

  function triggerReady() {
    window.dispatchEvent(new Event('ready'));
  }

  function sleep(duration) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, duration);
    });
  }

  function setProgress(step, value) {
    progress[step - 1] = value;
    localStorage.setItem('progress', JSON.stringify(progress));
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

  document.documentElement.addEventListener(
    'keyup',
    event => {
      switch (event.key.toLowerCase()) {
        case 'i':
          if (!activeOverlay) {
            info();
          }
          break;
        case 't':
          if (!activeOverlay) {
            window.location.hash = 'test';
            window.location.reload();
          }
          break;
        case 'escape':
          onClick();
          break;
      }
    },
    false
  );

  // Show info
  async function info() {
    window.location.hash = 'info';
    if (!infoElement) {
      const res = await fetch(`/info${window.location.pathname}`);

      if (!res.ok) return;

      infoElement = document.createElement('div');
      infoElement.id = 'info';
      infoElement.innerHTML = await res.text();
      infoElement.querySelector('button').addEventListener('click', onClick);
    }
    activeOverlay = infoElement;
    document.body.appendChild(infoElement);
  }

  // Show/run test
  async function test() {
    let script;

    window.location.hash = 'test';
    if (!testElement) {
      const res = await fetch(`/test${window.location.pathname}`);

      if (!res.ok) return;

      script = document.createElement('script');
      document.head.appendChild(script);
      testElement = document.createElement('div');
      testElement.id = 'test';
      testElement.innerHTML = await res.text();
      testElement.querySelector('button').addEventListener('click', onClick);
    }
    activeOverlay = testElement;
    document.body.appendChild(testElement);
    if (script) {
      const dummyScript = testElement.querySelector('script');

      script.text = dummyScript.text;
      testElement.removeChild(dummyScript);
    }
  }

  function onClick(event) {
    window.location.hash = '';
    if (activeOverlay) {
      document.body.removeChild(activeOverlay);
      activeOverlay = undefined;
    }
  }
})();
