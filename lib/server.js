'use strict';

const { get } = require('koa-route');
const indexTmpl = require('./index.tmpl.js');
const Koa = require('koa');
const md = require('markdown-it')();
const readFile = require('./readFile');
const staticNewsSite = require('./static');

const app = new Koa();
const runtime = readFile('lib/runtime.js');

app.use(
  get('/', async ctx => {
    ctx.body = await indexTmpl(ctx);
  })
);

app.use(
  get('/:step(step\\d+)/:article?', async (ctx, step, article) => {
    const js = readFile(`${step}/index.js`);
    const css = readFile(`${step}/index.css`);

    if (js) {
      ctx.state.js = js;
    }
    if (css) {
      ctx.state.css = css;
    }
    ctx.state.runtime = runtime;
    ctx.body = await staticNewsSite[!article ? 'home' : 'article'](ctx, article);
  })
);

app.use(
  get('/info/:step', (ctx, step) => {
    const readme = readFile(`${step}/README.md`);

    if (!readme) {
      return ctx.throw(404);
    }

    ctx.body = md.render(readme);
  })
);

app.use(
  get('/test/:step', (ctx, step) => {
    const test = readFile(`${step}/test.js`);

    if (!test) {
      return ctx.throw(404);
    }

    ctx.body = test;
  })
);

app.listen(process.env.PORT);
