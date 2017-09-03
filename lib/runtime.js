(function() {
  const step = parseInt(/step(\d+)/.exec(window.location.pathname)[1], 10);
  const storedProgress = localStorage.getItem('progress');
  const progress = storedProgress ? JSON.parse(storedProgress) : [];
  let infoElement, testElement;
  let activeOverlay;

  window.setProgress = setProgress;
  window.unregister = unregister;
  window.cleanCaches = cleanCaches;
  window.clean = clean;
  window.shouldClean = shouldClean;

  // Enable mocha grepping
  if (/grep/.test(window.location.search) || window.location.hash === '#test') {
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
            test();
          }
          break;
        case 'escape':
          onClick();
          break;
      }
    },
    false
  );

  // Expose for test runner
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
      if (await shouldClean()) {
        await window.clean();
        location.reload();
        return;
      }

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
