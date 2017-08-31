'use strict';

const { get } = require('koa-route');
const indexTmpl = require('./index.tmpl.js');
const Koa = require('koa');
const md = require('markdown-it')({ html: true });
const path = require('path');
const readFile = require('./readFile');
const send = require('koa-send');

const PAGE_TYPES = {
  step1: 'static'
};

const app = new Koa();

// Add trailing slashes
app.use((ctx, next) => {
  if (!path.extname(ctx.path) && ctx.path.slice(-1) !== '/') {
    ctx.redirect(`${ctx.path}/`);
  }
  next();
});

// Start page
app.use(
  get('/', async ctx => {
    ctx.body = await indexTmpl(ctx);
  })
);

// Handle js/css files
app.use(
  get('/:step(step\\d+)/*.(js|css)', async (ctx, step) => {
    // const js = readFile(`${step}/index.js`);
    // const css = readFile(`${step}/index.css`);
    const filepath = path.basename(ctx.path);

    if (filepath === 'index.js' || filepath === 'index.css') {
      const type = path.extname(filepath).slice(1);
      const template = `lib/${PAGE_TYPES[step]}/index.${type}`;
      const user = `${step}/index.${type}`;
      let body = `// ${template} ==>\n` + readFile(template) + `\n// <==\n\n// ${user} ==>\n` + readFile(user) + '\n// <==';

      if (filepath === 'index.js') {
        body = `// lib/index.js ==>\n${readFile('lib/index.js')}\n// <==\n\n${body}`;
      }
      ctx.type = type;
      ctx.body = body;
    } else {
      // ctx.set('Cache-Control', 'no-cache, must-revalidate');
      try {
        await send(ctx, ctx.path);
      } catch (err) {
        console.log(ctx.path, err);
      }
    }
  })
);

app.use(
  get('/:step(step\\d+)/:article?', async (ctx, step, article) => {
    const templatePath = `./${PAGE_TYPES[step]}/${!article ? 'home' : 'article'}.tmpl.js`;

    ctx.body = await require(templatePath)(ctx, article);
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
