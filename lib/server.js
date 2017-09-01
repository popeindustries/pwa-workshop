'use strict';

const { get } = require('koa-route');
const Debug = require('debug');
const fs = require('fs');
const indexTmpl = require('./index.tmpl.js');
const Koa = require('koa');
const md = require('markdown-it')({ html: true });
const path = require('path');
const readFile = require('./readFile');

const app = new Koa();
const debug = Debug('pwa');

// Add trailing slashes
app.use((ctx, next) => {
  if (!path.extname(ctx.path) && ctx.path.slice(-1) !== '/') {
    debug('redirect (trailing slash):', ctx.path);
    ctx.redirect(`${ctx.path}/`);
  }
  next();
});

// Start page
app.use(
  get('/', async ctx => {
    debug('landing page');
    ctx.body = await indexTmpl(ctx);
  })
);

// Handle js/css files
app.use(
  get('/:step(step\\d+)/*.(js|css)', async (ctx, step) => {
    const filepath = path.basename(ctx.path);
    const type = path.extname(filepath).slice(1);
    let body;

    ctx.type = type;

    debug('file:', ctx.path);

    // Concat app + step files
    if (filepath === 'index.js' || filepath === 'index.css') {
      const appFile = `lib/app/index.${type}`;
      const stepFile = `${step}/index.${type}`;
      body = readFile(appFile) + '\n\n' + readFile(stepFile) + '\n\n';

      if (filepath === 'index.js') {
        body = `${readFile('lib/index.js')}\n\n${body}`;
      }
      ctx.body = body;
    } else {
      ctx.body = fs.createReadStream(path.join(process.cwd(), ctx.path));
    }
  })
);

app.use(
  get('/:step(step\\d+)/:article?', async (ctx, step, article) => {
    const templatePath = `./app/${!article ? 'home' : 'article'}.tmpl.js`;

    debug('app page:', step, article);
    ctx.body = await require(templatePath)(ctx, article);
  })
);

app.use(
  get('/info/:step', (ctx, step) => {
    const readme = readFile(`${step}/README.md`);

    if (!readme) {
      return ctx.throw(404);
    }

    debug('info:', step);
    ctx.body = md.render(readme);
  })
);

app.use(
  get('/test/:step', (ctx, step) => {
    const test = readFile(`${step}/test.js`);

    if (!test) {
      return ctx.throw(404);
    }

    debug('test:', step);
    ctx.body = test;
  })
);

app.listen(process.env.PORT);
