'use strict';

const {escapeHTML, getByPath, getFromApi, renderImg} = require('./utils.js');
const headTmpl = require('./partials/head.tmpl.js');
const headerTmpl = require('./partials/header.tmpl.js');
const footerTmpl = require('./partials/footer.tmpl.js');

module.exports = function home(ctx) {
  return new Promise(async (resolve, reject) => {
    resolve(render(Object.assign(getFromApi('index'), ctx.state)));
  });
};

function render(data) {
  return /*html*/ `
<html>
  ${headTmpl(data)}
  <body class="nrk-color-shade-1">
    ${headerTmpl(data)}
    <section class="pwa-section" id="home">
      ${getByPath(data, '_embedded.floors', []).map((floor) =>
        getByPath(floor, '_embedded.rooms', []).map((room) => {
          const href = parseFloat(String(room.url).match(/\d+\.\d+/), 10);
          const image = getByPath(room, 'artwork.source');

          return href? `<a class="pwa-plug nrk-color-base" href="${escapeHTML(href)}">
            ${image? renderImg({srcset: {'100': image}, sizes: '100vw'}) : ''}
            <h2>${escapeHTML(room.title)}</h2>
          </a>` : '';
        }).join('')
      ).join('')}
    </section>
    ${footerTmpl(data)}
  </body>
</html>
`;
}
