mocha.checkLeaks();

const results = mocha.run();
const re_step = /\/step(\d+)\//

results.on('end', () => {
  if (!results.failures) {
    const success = document.createElement('div');
    const link = document.createElement('a')

    success.id = 'success';
    success.innerHTML = '<p>Well done!</p>';
    link.href = `/step${parseInt(re_step.exec(window.location.pathname)[1], 10) + 1}/`;
    link.innerHTML = 'next';
    success.appendChild(link);

    document.getElementById('test').appendChild(success);
  }
});