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
    cache.put(new Request(`/step7/bar.js`), new Response('', { status: 200 }));
    await window.sleep(50);

    const response = await fetch('bar.js');

    expect(response).to.have.property('status', 200);
  });
  it('should cache resources returned from network', async () => {
    const req = new Request('dummy.js');
    const response = await fetch(req);
    const responseText = await response.text();
    const response2 = await fetch(req);
    const response2Text = await response2.text();
    const cached = await cache.match(req);
    const cachedText = await cached.text();

    expect(response).to.have.property('status', 200);
    expect(cached).to.have.property('status', 200);
    expect(cachedText).to.equal(responseText);
    expect(response2Text).to.equal(responseText);
    expect(response).to.not.equal(response2);
  });
  it('should not cache bad responses', async () => {
    const req = new Request('foo.js');
    const response = await fetch(req);
    const response2 = await fetch(req);
    const cached = await cache.match(req);

    expect(cached).to.not.exist;
  });
});
