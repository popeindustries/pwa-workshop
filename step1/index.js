'use strict';

if ('serviceWorker' in navigator) {
  console.log('registering')
  navigator.serviceWorker.register('sw.js');
}