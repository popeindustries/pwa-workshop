(function() {
  let infoElement, testElement;
  let activeOverlay;

  // Enable mocha grepping
  if (/grep/.test(window.location.search) || window.location.hash === '#test') {
    test();
  }
  if (window.location.hash === '#info') {
    info();
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

  async function info() {
    window.location.hash = 'info';
    if (!infoElement) {
      await fetch(`/info${window.location.pathname}`).then(async res => {
        if (res.ok) {
          infoElement = document.createElement('div');
          infoElement.id = 'info';
          infoElement.innerHTML = await res.text();
          infoElement.querySelector('button').addEventListener('click', onClick);
        }
      });
    }
    activeOverlay = infoElement;
    document.body.appendChild(infoElement);
  }

  async function test() {
    let script;

    window.location.hash = 'test';
    if (!testElement) {
      await fetch(`/test${window.location.pathname}`).then(async res => {
        if (res.ok) {
          script = document.createElement('script');
          document.head.appendChild(script);
          testElement = document.createElement('div');
          testElement.id = 'test';
          testElement.innerHTML = await res.text();
          testElement.querySelector('button').addEventListener('click', onClick);
        }
      });
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
