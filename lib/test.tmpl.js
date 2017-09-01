'use strict';

module.exports = function index(ctx) {
  return new Promise(async (resolve, reject) => {
    resolve(render(Object.assign({}, ctx.state)));
  });

};

function render(data) {
  return `
<h1>${data.title}</h1>
<p>Follow along with these N easy steps to transforming a <strong>Totally Boring Norwegian News (TBNN)</strong> web page into a <strong>Totally Awesome Norwegian News (TANN)</strong> Progressive Web App!</p>
<a href="/step1/">go!</a>
<script src="http://localhost:35729/livereload.js"></script>
`;
}
