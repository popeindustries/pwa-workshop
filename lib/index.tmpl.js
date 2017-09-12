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
    <p><em>PWA</em> isn't a single API or browser feature: like <em>AJAX</em> and <em>Responsive Design</em> before it, <em>PWA</em> is an <em>approach</em>, conceptual rather than concrete. And like those previous big ideas, it represents an (r)evolutionary step in how we build for the web.</p>
    <p>So how can we learn to embrace this new thinking? Let's transform an unreliable and slow site into something amazing in only 12 easy steps!</p>
    <a href="/step1/">go!</a>
    <script src="http://localhost:35729/livereload.js"></script>
  </body>
</html>
`;
}
