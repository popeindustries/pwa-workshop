'use strict';

const inline = require('../../inline');

module.exports = function head(data) {
  return `
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
  <title>${data.title}</title>
  ${data.manifest ? '<link href="' + data.manifest + '" rel="manifest">' : ''}
  <style>${inline('lib/static/index.css')}</style>
  <style>${inline('node_modules/mocha/mocha.css')}</style>
  <style>${inline('node_modules/github-markdown-css/github-markdown.css')}</style>
  <script>${inline('node_modules/mocha/mocha.js')}</script>
  <script>${inline('node_modules/chai/chai.js')}</script>
  ${data.runtime ? '<script>' + data.runtime + '</script>' : ''}
  ${data.js ? '<script>' + data.js + '</script>' : ''}
</head>
`;
};