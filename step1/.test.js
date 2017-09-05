const { expect } = window.chai;
const navigator = window.navigator;

describe('Step 1 - Registration', () => {
  before(window.beforeTest);
  beforeEach(() => {
    delete window.navigator;
  });
  afterEach(() => {
    window.navigator = navigator;
    window.unload('index.js');
  });

  it('should feature detect ServiceWorker before registering', async () => {
    window.navigator = {};
    await window.load('index.js');
    // will error if no feature detect
  });
  it('should register an empty ServiceWorker script', async () => {
    let registered = false;

    window.navigator = {
      serviceWorker: {
        register () {
          registered = true;
        }
      }
    };
    await window.load('index.js');
    expect(registered).to.equal(true);
  });
});
