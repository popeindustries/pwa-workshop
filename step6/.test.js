const { expect } = window.chai;

describe('Step 6 - Fetching', () => {
  before(async () => {
    await window.prepareForTesting();
    await window.load('index.js');
    await window.triggerReady();
  });

  it('should return a cached response', async () => {
    await window.getRegistrationAtState('activated');

    const start = Date.now();
    const response = await fetch('index.js');

    expect(response).to.have.property('status', 200);
    expect(Date.now() - start).to.be.within(0, 10);
  });
});
