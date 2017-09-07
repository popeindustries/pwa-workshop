'use strict';
const inline = require('../../inline');

module.exports = function footer(data) {
  return /*html*/ `
    <footer class="pwa-footer">
      <a href="#home">
        <svg width="25" height="25" aria-hidden="true"><use xlink:href="#nrk-latest-news" /></svg>
        <br>Aktuelt
      </a>
      <a href="#custom">
        <svg width="25" height="25" aria-hidden="true"><use xlink:href="#nrk-heart" /></svg>
        <br>Mitt utvalg
      </a>
      <a href="#categories">
        <svg width="25" height="25" aria-hidden="true"><use xlink:href="#nrk-geopoint" /></svg>
        <br>Kategorier
      </a>
    </footer>
    <script src="http://localhost:35729/livereload.js"></script>
    <script async src="https://static.nrk.no/core-icons/latest/core-icons.min.js"></script>
    <script>${inline('lib/static/app.js')}</script>
  `;
};
