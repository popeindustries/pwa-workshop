'use strict';

const { get } = require('koa-route');
const Debug = require('debug');
const fs = require('fs');
const indexTmpl = require('./index.tmpl.js');
const infoTmpl = require('./info.tmpl.js');
const testTmpl = require('./test.tmpl.js');
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
    ctx.set('Cache-Control', 'no-cache');

    debug('file:', ctx.path);

    // Concat app + step files
    if (filepath === 'index.js' || filepath === 'index.css' || filepath === 'sw.js') {
      const appFile = `lib/app/${filepath}`;
      const stepFile = `${step}/${filepath}`;

      body = readFile(appFile) + '\n\n' + readFile(stepFile) + '\n\n';
      ctx.set('Content-Length', Buffer.from(body, 'utf8').length);
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
  get('/info/:step', async (ctx, step) => {
    const readme = readFile(`${step}/README.md`);

    if (!readme) {
      debug('no info:', step);
      return ctx.throw(404);
    }

    debug('info:', step);
    ctx.state.content = md.render(readme);
    ctx.body = await infoTmpl(ctx);
  })
);

app.use(
  get('/test/:step', async (ctx, step) => {
    const test = readFile(`${step}/.test.js`);

    if (!test) {
      debug('no test:', step);
      return ctx.throw(404);
    }

    debug('test:', step);
    ctx.state.content = test;
    ctx.body = await testTmpl(ctx);
  })
);

app.listen(process.env.PORT);
