'use strict';

const agent = require('superagent');
const head = require('./partials/head');
const header = require('./partials/header');
const footer = require('./partials/footer');

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
  ${head(data)}
  <body>
    ${header(data)}
    <section></section>
    ${footer(data)}
  </body>
</html>
`;
}
