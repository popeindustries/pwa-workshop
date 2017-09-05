'use strict';

const inline = require('../../inline');

module.exports = function head(data) {
  return `
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
  <title>${data.title}</title>

  ${data.manifest ? '<link href="' + data.manifest + '" rel="manifest">' : ''}

  <style>${inline('node_modules/mocha/mocha.css')}</style>
  <style>${inline('node_modules/github-markdown-css/github-markdown.css')}</style>
  <style>${inline('lib/runtime.css')}</style>
  <link href="index.css" rel="stylesheet">

  <script>${inline('node_modules/mocha/mocha.js')}</script>
  <script>${inline('node_modules/chai/chai.js')}</script>
  <script>${inline('lib/loadScript.js')}</script>
  <script>${inline('lib/runtime.js')}</script>
</head>
`;
};