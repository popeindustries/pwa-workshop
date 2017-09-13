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

  it('should only cache same or trusted origin responses', async () => {
    const request = new Request('https://fonts.googleapis.com/css?family=Roboto');
    const response = await fetch(request, { mode: 'cors' });
    const cached = await cache.match(request);

    expect(cached).to.not.exist;
  });
  it('should only cache GET requests', async () => {
    const request = new Request('http://localhost:3333/foo');
    const response = await fetch(request, { method: 'post' });
    const cached = await cache.match(request);

    expect(cached).to.not.exist;
  });
  it('should cache opaque requests from "gfx-stage.nrk.no"', async () => {
    const request = new Request('https://gfx-stage.nrk.no/sMCplIajgddnvcvABjBe-A28Tu0iEUKWGyyPA5SndOqw');
    const response = await fetch(request, { mode: 'no-cors' });
    await window.sleep(50);
    const cached = await cache.match(request);

    expect(cached).to.exist;
  });
});
