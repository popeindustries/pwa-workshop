const { expect } = window.chai;

describe('Step 1 - Registration', () => {
  it('should register an empty ServiceWorker script', () => {
    return navigator.serviceWorker.ready.then(registration => {
      expect(registration).to.exist;
    });
  });
});
