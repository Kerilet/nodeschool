/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* objective: make the big crud */

const util = require('util');
const path = require('path');
const fs = require('fs');
const slugify = require('slugify');

const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const compare = (str1, str2) => {
  const slugged1 = slugify(str1, {
    lower: true,
  });
  const slugged2 = slugify(str2, {
    lower: true,
  });
  return slugged1.includes(slugged2);
};

module.exports = {
  async readAll(ctx) {
    const results = [];
    const jsonPath = path.join(__dirname, '../jsons/jojos');
    const files = await readDir(jsonPath);
    const {
      limit = 20, offset = 0, fullname = '', birthDate = '',
    } = ctx.request.query;
    const fullnameCT = ctx.request.query['fullname.ct'];
    for (const filename of files) {
      const buffer = await readFile(path.join(__dirname, `../jsons/jojos/${filename}`));
      const result = JSON.parse(buffer.toString());
      results.push(result);
    }
    const filtered = results
      .filter((item) => (fullname !== '' ? item.fullName === fullname : true))
      .filter((item) => (birthDate !== '' ? item.birthDate === birthDate : true))
      .filter((item) => (fullnameCT !== '' ? compare(item.fullName, fullnameCT) : true));
    const offseted = filtered
      .filter((item, index) => index >= offset)
      .filter((item, index) => index < limit);

    ctx.body = {
      count: filtered.length,
      results: offseted,
    };
  },
  async readSingle(ctx) {
    try {
      const json = fs.readFileSync(path.resolve(__dirname, `../jsons/jojos/${ctx.params.slug}.json`));
      ctx.body = JSON.parse(json);
    } catch (error) {
      ctx.status = 404;
    }
  },
  async create(ctx) {
    const json = ctx.request.body;
    const slugedJson = slugify(json.fullName, {
      lower: true,
    });
    const name = slugedJson;
    json.slug = slugedJson;
    await writeFile(`src/jsons/jojos/${name}.json`, JSON.stringify(json, null, 4));
    ctx.status = 201;
    ctx.body = json;
  },
  async update(ctx) {
    const { slug } = ctx.params;
    const filePath = `src/jsons/jojos/${slug}.json`;
    try {
      fs.unlinkSync(filePath);
      const json = ctx.request.body;
      const slugedJson = slugify(json.fullName, {
        lower: true,
      });
      json.slug = slugedJson;
      await writeFile(`src/jsons/jojos/${slugedJson}.json`, JSON.stringify(json, null, 4));
      ctx.body = json;
    } catch (err) {
      console.error(err);
    }
  },
  async delete(ctx) {
    const filePath = `src/jsons/jojos/${ctx.params.slug}.json`;
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
