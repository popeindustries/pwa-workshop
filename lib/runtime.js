(function() {
  document.documentElement.addEventListener(
    'keyup',
    event => {
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

  function info() {
    fetch(`info${window.location.pathname}`).then(async res => {
      if (res.ok) {
        const overlay = document.createElement('div');
        const slot = document.createElement('div');
        const button = document.createElement('button');

        button.addEventListener('click', event => {
          document.body.removeChild(overlay);
        });
        overlay.id = 'info';
        slot.innerHTML = await res.text();
        overlay.appendChild(button);
        overlay.appendChild(slot);
        document.body.appendChild(overlay);
      }
    });
  }

  function test() {
    fetch(`test${window.location.pathname}`).then(async res => {
      if (res.ok) {
        const overlay = document.createElement('div');
        const script = document.createElement('script');
        const mocha = document.createElement('div');
        const test = document.createElement('script');
        const button = document.createElement('button');

        button.addEventListener('click', event => {
          document.body.removeChild(overlay);
        });
        overlay.id = 'test';
        mocha.id = 'mocha';
        script.innerHTML = 'mocha.setup("bdd")';
        test.innerHTML = `(function () {${await res.text()}})()\nmocha.checkLeaks();\nmocha.run();`;
        overlay.appendChild(script);
        overlay.appendChild(button);
        overlay.appendChild(mocha);
        overlay.appendChild(test);
        document.body.appendChild(overlay);
      }
    });
  }
})();
