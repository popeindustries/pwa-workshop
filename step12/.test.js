const { expect } = window.chai;

describe('Step 12 - Manifest', () => {
  before(async () => {
    await window.prepareForTesting();
    await window.load('index.js');
    await window.triggerReady();
  });

  it('should specify a manifest file', async () => {
    const response = await fetch('manifest.json');
    const manifest = await response.json();

    expect(document.querySelector('link[href="manifest.json"]')).to.exist;
    expect(manifest).to.have.property('name');
  });
});
