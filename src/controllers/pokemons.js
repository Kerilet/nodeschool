/* objective: make the big crud */

const util = require('util');
const path = require('path');
const fs = require('fs');

const readDir = util.promisify(fs.readdir);

module.exports = {
  async readAll(ctx) {
    const jsonPath = path.join(__dirname, '../jsons');
    const files = await readDir(jsonPath);
    const { limit = 20, offset = 0 } = ctx.request.query;
    const offseted = files
      .filter((item, index) => index >= offset)
      .filter((item, index) => index < limit);
    ctx.body = {
      count: files.length,
      results: offseted.map((file) => {
        const pokemonName = file.slice(0, -5);
        return {
          name: pokemonName,
          url: `/pokemons/${pokemonName}`,
        };
      }),
    };
  },
  async readSingle(ctx) {
    try {
      const json = fs.readFileSync(path.resolve(__dirname, `../jsons/${ctx.params.pokemonName}.json`));
      ctx.body = json.toString();
    } catch (error) {
      ctx.status = 404;
    }
  },
  async create(ctx) {
    const json = ctx.request.body;
    // eslint-disable-next-line no-console
    console.log(json.forms[0].name);
    ctx.body = 'created yay';
  },
  async update(ctx) {
    ctx.body = 'updated yay';
  },
  async delete(ctx) {
    ctx.body = 'deleted yay';
  },
};
