'use strict';

const inline = require('./inline');

module.exports = function info(ctx) {
  return new Promise(async (resolve, reject) => {
    resolve(render(Object.assign({}, ctx.state)));
  });
};

function render(data) {
  return `
<button></button>
<div id="mocha"></div>
<script>
mocha.setup("bdd");
(function () {
  ${data.content}
})()
${inline('lib/runner.js')}
</script>
`;
}
