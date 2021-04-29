const koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const util = require('util');
const pagination = require('koa-pagination-v2');

const app = new koa();

const router = new Router();
const readDir = util.promisify(fs.readdir);

router.get('/pokemons', async (ctx, /*next*/) => {
  const jsonPath = path.join(__dirname, 'jsons');
  const files = await readDir(jsonPath);
  const { limit = 20, offset = 0 } = ctx.request.query;
  // const offseted = [];
  // for (let index = offset; index < files.length; index++) {
  //   if (offseted.length < limit) {
  //     offseted.push(files[index]);
  //   } 
  // }
  const offseted = files
    .filter((item, index) => index >= offset)
    .filter((item, index) => index < limit);
  ctx.body = {
    count : files.length,
    results : offseted.map((file) => {
      const pokemonName = file.slice(0, -5);
      return {
        name : pokemonName,
        url : `/pokemons/${pokemonName}`
      }
    })
  };
  
});

router.get('/pokemons/:pokemonName', async (ctx, /*next*/) => {
  try {
    const json = fs.readFileSync(path.resolve(__dirname, `jsons/${ctx.params.pokemonName}.json`));
    ctx.body = json.toString();
  } catch (error) {
    ctx.status = 404;
  }
});


// router.get('/pokemons/:num', async (ctx, /*next*/) => {
//   try {
//     const limit = ctx.params.num;
//     console.log(limit);
//   } catch (error) {
//     ctx.status = 404;
//     console.log('still wrong')
//   }
// });

// app.get('/', async ctx => {
//   const { limit, offset, page } = ctx.state.paginate;

//   const { rows: users, count: total } = await User.findAndCountAll({
//       offset,
//       limit
//   });

//   return ctx.ok({
//       users,
//       _meta: { page, total, pageCount: Math.ceil(total / limit) }
//   });
// });

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(pagination({ defaultLimit: 20, maximumLimit: 50 }))
  .listen(3000);

  