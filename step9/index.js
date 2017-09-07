if ('serviceWorker' in navigator) {
  window.addEventListener('ready', () => {
    navigator.serviceWorker.register('sw.js');
  });
}