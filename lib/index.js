'use strict';

const { get } = require('koa-route');
const fs = require('fs');
const Koa = require('koa');
const md = require('markdown-it')();
const path = require('path');
const staticNewsSite = require('./static');

const app = new Koa();
const runtime = fs.readFileSync(path.resolve(__dirname, './runtime.js'), 'utf8');

app.use(
  get('/', async ctx => {
    ctx.body = 'hello!';
  })
);

app.use(
  get('/:step(step\\d+)/:article?', async (ctx, step, article) => {
    // const readme = fs.readFileSync(path.resolve(`${step}/README.md`), 'utf8');
    // md.render(readme);
    ctx.state.js = runtime;
    ctx.body = await staticNewsSite[!article ? 'home' : 'article'](ctx, article);
  })
);

app.listen(3000);
