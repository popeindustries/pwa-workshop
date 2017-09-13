const { expect } = window.chai;
let cache;

describe('Step 9 - Invalidation', () => {
  before(async () => {
    await window.prepareForTesting();
    await window.load('index.js');
    await window.triggerReady();
    await window.getRegistrationAtState('activated');
    cache = await window.caches.keys().then(keys => window.caches.open(keys[0]));
  });

  it('should return cached resource if not expired', async () => {
    const request = new Request(`/api/foo`);
    const response = new Response('{ "foo": false }', {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=120',
        Date: new Date().toUTCString()
      }
    });

    await cache.put(request, response);
    const res = await fetch(request);

    expect(await res.json()).to.eql({ foo: false });
  });
  it('should return network resource if expired', async () => {
    const request = new Request(`/api/foo`);
    const response = new Response('{ "foo": false }', {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=120',
        Date: new Date(Date.now() - 10000000).toUTCString()
      }
    });

    await cache.put(request, response);
    const res = await fetch(request);

    expect(await res.json()).to.eql({ foo: true });

  });
});
