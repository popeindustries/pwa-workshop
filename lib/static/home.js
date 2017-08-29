'use strict';

const agent = require('superagent');
const fs = require('fs');
const path = require('path');

const css = fs.readFileSync(path.resolve(__dirname, './index.css'), 'utf8');

module.exports = function home(ctx) {
  return new Promise(async (resolve, reject) => {
    const data = {
      title: 'Totally Boring Norwegian News'
    };
    // Fetch api data
    resolve(render(Object.assign(data, ctx.state)));
  });
};

function render(data) {
  return `
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
    <title>${data.title}</title>
    ${data.manifest ? '<link href="' + data.manifest + '" rel="manifest">' : ''}
    <style>${css}</style>
    ${data.js ? '<script>' + data.js + '</script>' : ''}
  </head>
  <body>
  </body>
</html>
`;
}
