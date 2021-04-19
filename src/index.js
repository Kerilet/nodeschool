// Requesting libs
const koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');

// Create a koa instance
const app = new koa();
// Create a koa-router instance
const router = new Router();
// Get a json file async
const dittoStream = fs.readFileSync('src/ditto.json');


// GEt /pokemons/ditto
router.get('/pokemons/ditto', async (ctx, /*next*/) => {
  ctx.body = dittoStream.toString();
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(1234);   