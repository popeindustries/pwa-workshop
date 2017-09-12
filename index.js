'use strict';

const { watch } = require('chokidar');
const { start, restart, refresh } = require('buddy-server');

const PORT = 3333;

const watcher = watch('.', {
  ignored: /(^|[\/\\])\..|node_modules/,
  ignoreInitial: true,
  persistent: true
});

watcher.on('change', onUpdate);

start(
  true,
  true,
  {
    file: 'lib/server.js',
    port: PORT
  },
  err => {
    if (err) {
      throw err;
    }
    console.log(`Welcome to the PWA-mazing workshop \\o/\n\n  point your browser at: http://localhost:${PORT}\n`);
  }
);

function onUpdate(path) {
  console.log('   + changed:', path);

  restart(err => {
    if (err) {
      return console.log(err);
    }
    refresh('foo.js');
  });
}