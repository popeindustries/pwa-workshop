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
      if (activeOverlay) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case 'i':
          info();
          break;
        case 't':
          test();
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
    window.location.hash = 'test';
    if (!testElement) {
      await fetch(`/test${window.location.pathname}`).then(async res => {
        if (res.ok) {
          testElement = document.createElement('div');
          const pretest = document.createElement('script');
          const mocha = document.createElement('div');
          const test = document.createElement('script');
          const button = document.createElement('button');

          button.addEventListener('click', onClick);
          testElement.id = 'test';
          mocha.id = 'mocha';
          pretest.text = 'mocha.setup("bdd")';
          test.text = `(function () {${await res.text()}})()\nmocha.checkLeaks();\nmocha.run();`;
          testElement.appendChild(pretest);
          testElement.appendChild(button);
          testElement.appendChild(mocha);
          testElement.appendChild(test);
        }
      });
    }
    activeOverlay = testElement;
    document.body.appendChild(testElement);
  }

  function onClick(event) {
    window.location.hash = '';
    document.body.removeChild(activeOverlay);
    activeOverlay = undefined;
  }
})();
