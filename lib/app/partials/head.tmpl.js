'use strict';

const {escapeHTML} = require('../utils.js');
const inline = require('../../inline');

module.exports = function head(data) {
  return /*html*/ `
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
  <title>NRK.no - ${escapeHTML(data.title)}</title>

  ${data.manifest ? '<link href="manifest.json" rel="manifest">' : ''}

  <link rel="stylesheet" href="https://static.nrk.no/core-css/latest/core-css.min.css" crossorigin>
  <link rel="stylesheet" href="https://static.nrk.no/core-fonts/latest/core-fonts.min.css" crossorigin>
  <link rel="preload" href="https://static.nrk.no/core-fonts/latest/LFT_Etica_Extrabold.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="https://static.nrk.no/core-fonts/latest/LFT_Etica_Bold.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="https://static.nrk.no/core-fonts/latest/LFT_Etica_Book.woff2" as="font" type="font/woff2" crossorigin>
  <script async src="https://static.nrk.no/core-icons/latest/core-icons.min.js" crossorigin></script>

  <style>${inline('node_modules/mocha/mocha.css')}</style>
  <style>${inline('node_modules/github-markdown-css/github-markdown.css')}</style>
  <style>${inline('lib/runtime.css')}</style>
  <style>${inline('lib/highlight.css')}</style>
  <link href="index.css" rel="stylesheet">

  <script>${inline('node_modules/mocha/mocha.js')}</script>
  <script>${inline('node_modules/chai/chai.js')}</script>
  <script>${inline('lib/utils.js')}</script>
  <script>${inline('lib/runtime.js')}</script>
  <script>${inline('lib/highlight.js')}</script>
</head>
`;
};
