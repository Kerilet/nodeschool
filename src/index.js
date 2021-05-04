const Koa = require('koa');
const koaBody = require('koa-body');
const routes = require('./routes');

const app = new Koa();

app
  .use(koaBody())
  .use(routes.routes())
  .use(routes.allowedMethods())
  .listen(3000);
