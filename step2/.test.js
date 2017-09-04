const { expect } = window.chai;

describe('Step 2 - Registration', () => {
  before(async () => {
    if (await window.shouldClean()) {
      await window.clean();
      window.location.reload();
      throw Error('reloading');
    }
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


