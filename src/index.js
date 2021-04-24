const koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

const app = new koa();

const router = new Router();

// const pokemons = fs.readFileSync(path.resolve(__dirname, 'jsons/pokemons.json'));

router.get('/pokemons', async (ctx, /*next*/) => {
  const jsonPath = path.join(__dirname, 'jsons');
  const jsonDirectory = fs.readdir(jsonPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    } files.forEach(function (file) {
      const json = file;
      console.log(file);
      ctx.body += file;
    })
  });
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