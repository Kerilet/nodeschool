const koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

const app = new koa();

const router = new Router();

// const pokemons = fs.readFileSync(path.resolve(__dirname, 'jsons/pokemons.json'));

router.get('/pokemons', async (ctx, /*next*/) => {
  ctx.body = pokemons.toString();
});

router.get('/pokemons/:pokemonName', async (ctx, /*next*/) => {
  try {
    const json = fs.readFileSync(path.resolve(__dirname, `jsons/${ctx.params.pokemonName}.json`));
    ctx.body = json.toString();
  } catch (error) {
    ctx.status = 404;
  }
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);