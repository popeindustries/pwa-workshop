const { expect } = window.chai;

describe('Step 5 - Activation', () => {
  before(async () => {
    await window.prepareForTesting();
    await window.caches.open('step5-old');
    await window.caches.open('step5-secret');
    await window.load('index.js');
    await window.triggerReady();
  });

  it('should remove old caches on activation', async () => {
    await window.getRegistrationAtState('activated');
    const keys = await window.caches.keys();

    expect(keys).to.have.length(1);
  });
});
