/**
 * Add your solution code here.
 * When you're ready, press the 'T' key to test your solution.
 * Press the 'I' key to get more information on the current challenge.
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('ready', () => {
    navigator.serviceWorker.register('sw.js');
  });
}