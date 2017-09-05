const { expect } = window.chai;

describe('Step 2 - Registration', () => {
  before(window.prepareForTesting);
  beforeEach(async () => {
    await window.load('index.js');
  });

  it('should not register an empty ServiceWorker if no "ready" event has fired', async () => {
    const registration = await navigator.serviceWorker.getRegistration();

    expect(registration).to.equal(undefined);
  });
  it('should register an empty ServiceWorker after the "ready" event has fired', async () => {
    window.triggerReady();
    await window.sleep(500)

    const registration = await navigator.serviceWorker.getRegistration();

    expect(registration).to.exist;
  });
});


