const { expect } = window.chai;
let cache;

describe('Step 8 - Routing', () => {
  before(async () => {
    await window.prepareForTesting();
    await window.load('index.js');
    await window.triggerReady();
    await window.getRegistrationAtState('activated');
    cache = await window.caches.keys().then(keys => window.caches.open(keys[0]));
  });

  it('should only cache same origin responses', async () => {
    const request = new Request('http://localhost:35729/livereload.js');
    const response = await fetch(request, { mode: 'no-cors' });
    const responseText = await response.text();
    const cached = await cache.match(request);

    expect(cached).to.not.exist;
  });
  it('should only cache GET requests', async () => {
    const request = new Request('http://localhost:3333/foo');
    const response = await fetch(request, { method: 'post' });
    const responseText = await response.text();
    const cached = await cache.match(request);

    expect(cached).to.not.exist;
  });
});
