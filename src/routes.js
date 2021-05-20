const Router = require('koa-router');
const pokemons = require('./controllers/pokemons');
const jojos = require('./controllers/jojos');
const students = require('./controllers/students');

const router = new Router();

router.get('/pokemons', pokemons.readAll);

router.get('/pokemons/:pokemonName', pokemons.readSingle);

router.post('/pokemons', pokemons.create);

router.put('/pokemons/:pokemonName', pokemons.update);

router.del('/pokemons/:pokemonName', pokemons.delete);

// pokemons up, jojos down

router.get('/jojos', jojos.readAll);

router.get('/jojos/:slug', jojos.readSingle);

router.post('/jojos', jojos.create);

router.put('/jojos/:slug', jojos.update);

router.del('/jojos/:slug', jojos.delete);

// Students
router.get('/students', students.readAll);

module.exports = router;
