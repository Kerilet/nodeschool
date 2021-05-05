const Koa = require('koa');
const koaBody = require('koa-body');
const routes = require('./routes');

const app = new Koa();

app
  .use(koaBody(koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024, // Set the maximum upload file size limit, default 2M
    },
  })))
  .use(routes.routes())
  .use(routes.allowedMethods())
  .listen(3000);
