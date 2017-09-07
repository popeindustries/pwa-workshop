const { expect } = window.chai;
let cache;

describe('Step 7 - Runtime caching', () => {
  before(async () => {
    await window.prepareForTesting();
    await window.load('index.js');
    await window.triggerReady();
    await window.getRegistrationAtState('activated');
    cache = await window.caches.keys().then(keys => window.caches.open(keys[0]));
  });

  it('should return resources from cache', async () => {
    cache.put(new Request(`/step7/foo.js`), new Response('', { status: 200 }));

    const response = await fetch('foo.js');

    expect(response).to.have.property('status', 200);
  });
  it('should cache resources returned from network', async () => {
    const response = await fetch('dummy.js');
    const cached = await cache.match('/dummy.js');

    expect(response).to.have.property('status', 200);
    expect(cached).to.have.property('status', 200);
    // console.log(response, cached)
  });
  it('should not cache bad responses');
});
