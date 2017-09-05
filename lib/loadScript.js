(function () {
  function loadScript (url, cb) {
    const script = document.createElement('script')
    const first = document.getElementsByTagName('script')[0];

    script.async = true;
    script.src = url;

    // Register callback
    if ('function' == typeof cb) {
      script.onload = function () {
        cb();
        script.onload = script.onerror = null;
      };
      script.onerror = function (err) {
        cb(err);
        script.onload = script.onerror = null;
      }
    }

    // Insert
    first.parentNode.insertBefore(script, first);
  }

  window.loadScript = loadScript;
})();