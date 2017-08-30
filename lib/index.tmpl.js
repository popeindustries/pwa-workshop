'use strict';

const inline = require('./inline');

module.exports = function index(ctx) {
  return new Promise(async (resolve, reject) => {
    const data = {
      title: 'PWA-mazing!'
    };
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
  <style>${inline('lib/index.css')}</style>
  </head>
  <body>
    <h1>${data.title}</h1>
    <p>Follow along with these N easy steps to transforming a <strong>Totally Boring Norwegian News (TBNN)</strong> web page into a <strong>Totally Awesome Norwegian News (TANN)</strong> Progressive Web App!</p>
    <a href="/step1">go!</a>
    <script src="http://localhost:35729/livereload.js"></script>
  </body>
</html>
`;
}
