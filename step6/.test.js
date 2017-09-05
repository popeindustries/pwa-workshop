const { expect } = window.chai;

describe('Step 6 - Fetching', () => {
  before(async () => {
    await window.prepareForTesting();
    await window.load('index.js');
    await window.triggerReady();
  });

  it('should return a pre-cached response', async () => {
    const { active } = await window.getRegistrationAtState('activated');
    const cache = await window.caches.keys().then(keys => window.caches.open(keys[0]));

    cache.put(new Request(`step6/foo.js`), new Response('', { status: 200 }));

    const response = await fetch('foo.js');

    expect(response).to.have.length.property('status', 200);
  });
});
