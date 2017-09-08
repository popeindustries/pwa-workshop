const { expect } = window.chai;
let cb;

describe('Step 10 - Messaging', () => {
  before(async () => {
    await window.prepareForTesting();
    await window.load('index.js');
    await window.triggerReady();
    await window.getRegistrationAtState('activated');
  });
  afterEach(() => {
    if (cb) {
      navigator.serviceWorker.removeEventListener('message', cb);
      cb = undefined;
    }
  });

  it('should not notify clients when fetching cached resource', async () => {
    let called = false;

    navigator.serviceWorker.addEventListener(
      'message',
      (cb = event => {
        called = true;
      })
    );

    await fetch('index.js');
    await window.sleep(100);

    expect(called).to.equal(false);
  });
  it('should notify clients when successfully fetching network resource', async () => {
    let called = false;

    navigator.serviceWorker.addEventListener(
      'message',
      (cb = event => {
        called = true;
        expect(event.data).to.have.property('msg', 'online');
      })
    );

    await fetch('dummy.js');
    await window.sleep(100);

    expect(called).to.equal(true);
  });
  it('should notify clients when failure fetching network resource', async () => {
    let called = false;

    navigator.serviceWorker.addEventListener(
      'message',
      (cb = event => {
        called = true;
        expect(event.data).to.have.property('msg', 'offline');
      })
    );

    try {
      await fetch('dummy.js?offline');
      await window.sleep(100);
    } finally {
      expect(called).to.equal(true);
    }
  });
});
