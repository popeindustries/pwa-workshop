(function() {
  let infoElement, testElement;
  let activeOverlay;

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
    if (!infoElement) {
      await fetch(`info${window.location.pathname}`).then(async res => {
        if (res.ok) {
          infoElement = document.createElement('div');
          const slot = document.createElement('div');
          const button = document.createElement('button');

          button.addEventListener('click', onClick);
          infoElement.id = 'info';
          slot.classList.add('markdown-body');
          slot.innerHTML = await res.text();
          infoElement.appendChild(button);
          infoElement.appendChild(slot);
        }
      });
    }
    activeOverlay = infoElement;
    document.body.appendChild(infoElement);
  }

  async function test() {
    if (!testElement) {
      await fetch(`test${window.location.pathname}`).then(async res => {
        if (res.ok) {
          testElement = document.createElement('div');
          const pretest = document.createElement('script');
          const mocha = document.createElement('div');
          const test = document.createElement('script');
          const button = document.createElement('button');

          button.addEventListener('click', onClick);
          testElement.id = 'test';
          mocha.id = 'mocha';
          pretest.innerHTML = 'mocha.setup("bdd")';
          test.innerHTML = `(function () {${await res.text()}})()\nmocha.checkLeaks();\nmocha.run();`;
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
    document.body.removeChild(activeOverlay);
    activeOverlay = undefined;
  }
})();
