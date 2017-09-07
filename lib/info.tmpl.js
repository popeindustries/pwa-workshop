'use strict';

module.exports = function info(ctx) {
  return new Promise(async (resolve, reject) => {
    resolve(render(Object.assign({}, ctx.state)));
  });

};

function render(data) {
  return `
<button></button>
<div class="markdown-body">${data.content}</div>
`;
}
