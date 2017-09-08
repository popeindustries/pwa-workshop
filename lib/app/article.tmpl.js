'use strict';

const {getByPath, getFromApi, renderImg} = require('./utils.js');
const headTmpl = require('./partials/head.tmpl.js');
const headerTmpl = require('./partials/header.tmpl.js');
const footerTmpl = require('./partials/footer.tmpl.js');

module.exports = function article(ctx, id) {
  return new Promise(async (resolve, reject) => {
    resolve(render(Object.assign(getFromApi(id), ctx.state)));
  });
};

function figure(image){
  return image? `<figure>
    ${renderImg({
      srcset: image.crops[image.selectedCrop],

    })}
  </figure>` : '';
}

function render(data) {
  const srcset = data.leadImage && data.leadImage.crops[data.leadImage.selectedCrop];

  return /*html*/ `
<html>
  ${headTmpl(data)}
  <body class="nrk-color-base">
    ${headerTmpl(data)}
    <section class="pwa-section">
      ${srcset? `<div class="pwa-cover nrk-xs-100">${renderImg({srcset})}</div>`  : ''}
      <article class="pwa-article">
        <h1>${data.title}</h1>
        <br>
        ${getByPath(data, 'body.text', '').replace(/<element localref="([^"]+)"[^>]*>/g, (match, id) => {
          const img = data.body.elements[id].image;
          return renderImg({
            sizes: '(min-width:720px) 575px, 100vw',
            srcset: getByPath(img, `crops.${getByPath(img, 'selectedCrop')}`),
          });
        })}
      </article>
    </section>
    ${footerTmpl(data)}
  </body>
</html>
`;
}
