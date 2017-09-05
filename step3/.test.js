const { expect } = window.chai;

describe('Step 3 - Installation', () => {
  before(async () => {
    await window.prepareForTesting();
    await window.load('index.js');
    await window.triggerReady();
  });

  it('should pre-cache assets on install', async () => {
    let cached = false;
    await window.getRegistrationAtState('installed');
    const keys = await window.caches.keys();

    await Promise.all(
      keys.map(async key => {
        const cache = await window.caches.open(key);
        const keys = await cache.keys();

        if (keys.length == 2) {
          cached = true;
        }
      })
    );

    expect(cached).to.equal(true);
  });
});
