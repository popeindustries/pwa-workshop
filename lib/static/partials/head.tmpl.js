'use strict';

const inline = require('../../inline');

module.exports = function head(data) {
  return `
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
  <title>${data.title}</title>
  ${data.manifest ? '<link href="' + data.manifest + '" rel="manifest">' : ''}
  <style>${inline('lib/static/app.css')}</style>
  <style>${inline('node_modules/mocha/mocha.css')}</style>
  <style>${inline('node_modules/github-markdown-css/github-markdown.css')}</style>
  <script>${inline('node_modules/mocha/mocha.js')}</script>
  <script>${inline('node_modules/chai/chai.js')}</script>
  <link rel="stylesheet" href="https://static.nrk.no/core-css/latest/core-css.min.css">
  <link rel="stylesheet" href="https://static.nrk.no/core-fonts/latest/core-fonts.min.css">
  <link rel="preload" href="https://static.nrk.no/core-fonts/latest/LFT_Etica_Bold.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="https://static.nrk.no/core-fonts/latest/LFT_Etica_Book.woff2" as="font" type="font/woff2" crossorigin>
  <style>

  </style>
  ${data.runtime ? '<script>' + data.runtime + '</script>' : ''}
  ${data.js ? '<script>' + data.js + '</script>' : ''}
</head>
`;
};
