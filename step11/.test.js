const { expect } = window.chai;

describe('Step 11 - Offline', () => {
  before(async () => {
    await window.prepareForTesting();
    await window.load('index.js');
    await window.triggerReady();
    await window.getRegistrationAtState('activated');
  });

  it('should return a fallback page when offline', async () => {
    const request = new Request('/step11/index.html?offline');
    const response = await fetch(request, { headers: {
      accept: ['text/html']
    }});
    const html = await response.text();

    expect(html).to.exist;
  });
});
