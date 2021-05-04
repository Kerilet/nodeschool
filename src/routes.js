const Router = require('koa-router');
const pokemons = require('./controllers/pokemons');

const router = new Router();

router.get('/pokemons', pokemons.readAll);

router.get('/pokemons/:pokemonName', pokemons.readSingle);

router.post('/pokemons', pokemons.create);

router.put('/pokemons/:pokemonName', pokemons.update);

router.del('/pokemons/:pokemonName', pokemons.delete);

module.exports = router;
