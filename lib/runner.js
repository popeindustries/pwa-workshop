const results = mocha.run();

results.on('end', () => {
  if (!results.failures) {
    const step = parseInt(/\/step(\d+)\//.exec(window.location.pathname)[1], 10);
    const success = document.createElement('div');
    const link = document.createElement('a')

    success.id = 'success';
    success.innerHTML = '<p>Well done!</p>';
    link.href = `/step${step + 1}/`;
    link.innerHTML = 'next';
    success.appendChild(link);

    document.getElementById('test').appendChild(success);
    window.setProgress(step, 1);
  }
});