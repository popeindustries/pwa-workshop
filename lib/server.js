'use strict';

const { get } = require('koa-route');
const fs = require('fs');
const indexTmpl = require('./index.tmpl.js');
const Koa = require('koa');
const md = require('markdown-it')();
const path = require('path');
const superagent = require('superagent');
const staticNewsSite = require('./static');

const app = new Koa();
const runtime = fs.readFileSync(path.resolve(__dirname, './runtime.js'), 'utf8');

app.use(
  get('/', async ctx => {
    ctx.body = await indexTmpl(ctx);
  })
);

// app.use('/api/:houseId', async (ctx, houseId) => {
//   ctx.body = await superagent
//     .get(`https://kurator-api-stage.nrk.no/houses/${houseId}`)
//     .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkVpcmlrIEJhY2tlciIsImFkbWluIjp0cnVlfQ.ujqiXF-KbxpgOGu7ShKAK4Wf7jUbdzzn5i4R8T4Dipg');
// });

app.use(
  get('/:step(step\\d+)/:article?', async (ctx, step, article) => {
    ctx.state.runtime = runtime;
    ctx.body = await staticNewsSite[!article ? 'home' : 'article'](ctx, article);
  })
);

app.use(
  get('/info/:step', (ctx, step) => {
    const readme = fs.readFileSync(path.resolve(`${step}/README.md`), 'utf8');

    if (!readme) {
      return ctx.throw(404);
    }

    ctx.body = md.render(readme);
  })
);

app.use(
  get('/info/:step', (ctx, step) => {
    const readme = fs.readFileSync(path.resolve(`${step}/README.md`), 'utf8');

    if (!readme) {
      return ctx.throw(404);
    }

    ctx.body = md.render(readme);
  })
);

app.use(
  get('/test/:step', (ctx, step) => {
    const test = fs.readFileSync(path.resolve(`${step}/test.js`), 'utf8');

    if (!test) {
      return ctx.throw(404);
    }

    ctx.body = test;
  })
);

app.listen(process.env.PORT);
