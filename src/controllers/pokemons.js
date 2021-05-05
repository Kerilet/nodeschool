/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* objective: make the big crud */

const util = require('util');
const path = require('path');
const fs = require('fs');

const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

module.exports = {
  async readAll(ctx) {
    const jsonPath = path.join(__dirname, '../jsons/pokemons');
    const files = await readDir(jsonPath);
    const { limit = 20, offset = 0 } = ctx.request.query;
    const offseted = files
      .filter((item, index) => index >= offset)
      .filter((item, index) => index < limit);
    const results = [];
    for (const filename of offseted) {
      const buffer = await readFile(path.join(__dirname, `../jsons/pokemons/${filename}`));
      const result = JSON.parse(buffer.toString());
      results.push(result);
    }
    ctx.body = {
      count: files.length,
      results,
    };
  },
  async readSingle(ctx) {
    try {
      const json = fs.readFileSync(path.resolve(__dirname, `../jsons/pokemons/${ctx.params.pokemonName}.json`));
      ctx.body = JSON.parse(json);
    } catch (error) {
      ctx.status = 404;
    }
  },
  async create(ctx) {
    const json = ctx.request.body;
    const { name } = json.forms[0];
    await writeFile(`src/jsons/pokemons/${name}.json`, JSON.stringify(json, null, 4));
    ctx.status = 201;
    ctx.body = json;
  },
  async update(ctx) {
    const { pokemonName } = ctx.params;
    const filePath = `src/jsons/pokemons/${pokemonName}.json`;
    try {
      fs.unlinkSync(filePath);
      const json = ctx.request.body;
      await writeFile(`src/jsons/pokemons/${pokemonName}.json`, JSON.stringify(json, null, 4));
      ctx.body = json;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  },
  async delete(ctx) {
    const filePath = `src/jsons/pokemons/${ctx.params.pokemonName}.json`;
    try {
      fs.unlinkSync(filePath);
      ctx.status = 204;
      ctx.body = '';
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  },
};
