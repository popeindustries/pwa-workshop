'use strict';

module.exports = function header(data) {
  return /*html*/ `
    <header class="pwa-header">
      <a rel="home" href="#">
        <svg width="50" height="20" aria-hidden="true"><use xlink:href="#nrk-logo-nrk" /></svg>
      </a>
    </header>
  `;
};
