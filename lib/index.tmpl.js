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
    <p><em>Progressive Web Apps (PWA)</em> are web experiences that are <strong>reliable</strong> under poor or non-existant network connections; are <strong>fast and responsive</strong> to user interaction; and are as <strong>engaging</strong> as native, downloadable apps.</p>
    <p>Let's turn an unreliable, slow, and boring web site into something amazing in only N steps!</p>
    <a href="/step1/">go!</a>
    <script src="http://localhost:35729/livereload.js"></script>
  </body>
</html>
`;
}
