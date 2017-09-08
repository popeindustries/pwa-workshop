(function() {
  const step = parseInt(/step(\d+)/.exec(window.location.pathname)[1], 10);
  const storedProgress = localStorage.getItem('progress');
  const progress = storedProgress ? JSON.parse(storedProgress) : [];
  let isTest = false;
  let activeOverlay, infoElement, testElement;

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
    window.load('index.js').then(triggerReady);
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

  window.setProgress = function setProgress(step, value) {
    progress[step - 1] = value;
    localStorage.setItem('progress', JSON.stringify(progress));
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
    hljs.initHighlighting();
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
