'use strict';

const agent = require('superagent');
const headTmpl = require('./partials/head.tmpl.js');
const headerTmpl = require('./partials/header.tmpl.js');
const footerTmpl = require('./partials/footer.tmpl.js');

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
  ${headTmpl(data)}
  <body>
    ${headerTmpl(data)}
    <section></section>
    ${footerTmpl(data)}
  </body>
</html>
`;
}
