const koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');

const app = new koa();

const router = new Router();

const pokemons = fs.readFileSync('src/pokemons.json');
const aegislashStream = fs.readFileSync('src/aegislash.json');
const chandelureStream = fs.readFileSync('src/chandelure.json');
const dialgaStream = fs.readFileSync('src/dialga.json');
const dittoStream = fs.readFileSync('src/ditto.json');
const dracovishStream = fs.readFileSync('src/dracovish.json');
const dragapultStream = fs.readFileSync('src/dragapult.json');
const dragoniteStream = fs.readFileSync('src/dragonite.json');
const drifblimStream = fs.readFileSync('src/drifblim.json');
const dusknoirStream = fs.readFileSync('src/dusknoir.json');
const gengarStream = fs.readFileSync('src/gengar.json');
const hydreigonStream = fs.readFileSync('src/hydreigon.json');
const kingdraStream = fs.readFileSync('src/kingdra.json');
const kyuremStream = fs.readFileSync('src/kyurem.json');
const mimikyuStream = fs.readFileSync('src/mimikyu.json');
const misdreavusStream = fs.readFileSync('src/misdreavus.json');
const naganadelStream = fs.readFileSync('src/naganadel.json');
const sableyeStream = fs.readFileSync('src/sableye.json');
const salamenceStream = fs.readFileSync('src/salamence.json');
const trevenantStream = fs.readFileSync('src/trevenant.json');
const tyrantrumStream = fs.readFileSync('src/tyrantrum.json');

router.get('/pokemons/', async (ctx, /*next*/) => {
  ctx.body = pokemons.toString();
});

router.get('/pokemons/aegislash', async (ctx, /*next*/) => {
  ctx.body = aegislashStream.toString();
});

router.get('/pokemons/chandelure', async (ctx, /*next*/) => {
  ctx.body = chandelureStream.toString();
});

router.get('/pokemons/dialga', async (ctx, /*next*/) => {
  ctx.body = dialgaStream.toString();
});

router.get('/pokemons/ditto', async (ctx, /*next*/) => {
  ctx.body = dittoStream.toString();
});

router.get('/pokemons/dracovish', async (ctx, /*next*/) => {
  ctx.body = dracovishStream.toString();
});

router.get('/pokemons/dragapult', async (ctx, /*next*/) => {
  ctx.body = dragapultStream.toString();
});

router.get('/pokemons/dragonite', async (ctx, /*next*/) => {
  ctx.body = dragoniteStream.toString();
});

router.get('/pokemons/drifblim', async (ctx, /*next*/) => {
  ctx.body = drifblimStream.toString();
});

router.get('/pokemons/dusknoir', async (ctx, /*next*/) => {
  ctx.body = dusknoirStream.toString();
});

router.get('/pokemons/gengar', async (ctx, /*next*/) => {
  ctx.body = gengarStream.toString();
});

router.get('/pokemons/hydreigon', async (ctx, /*next*/) => {
  ctx.body = hydreigonStream.toString();
});

router.get('/pokemons/kingdra', async (ctx, /*next*/) => {
  ctx.body = kingdraStream.toString();
});

router.get('/pokemons/kyurem', async (ctx, /*next*/) => {
  ctx.body = kyuremStream.toString();
});

router.get('/pokemons/mimikyu', async (ctx, /*next*/) => {
  ctx.body = mimikyuStream.toString();
});

router.get('/pokemons/misdreavus', async (ctx, /*next*/) => {
  ctx.body = misdreavusStream.toString();
});

router.get('/pokemons/naganadel', async (ctx, /*next*/) => {
  ctx.body = naganadelStream.toString();
});

router.get('/pokemons/sableye', async (ctx, /*next*/) => {
  ctx.body = sableyeStream.toString();
});

router.get('/pokemons/salamence', async (ctx, /*next*/) => {
  ctx.body = salamenceStream.toString();
});

router.get('/pokemons/trevenant', async (ctx, /*next*/) => {
  ctx.body = trevenantStream.toString();
});

router.get('/pokemons/tyrantrum', async (ctx, /*next*/) => {
  ctx.body = tyrantrumStream.toString();
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(1234);