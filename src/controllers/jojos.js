/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* objective: make the big crud */

const util = require('util');
const path = require('path');
const fs = require('fs');
const slugify = require('slugify');
const yup = require('yup');

const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const jojoSchema = yup.object().shape({
  fullName: yup.string().required(),
  birthDate: yup.date(),
  birthLocation: yup.string(),
  gender: yup.string().oneOf(['MALE', 'FEMALE', 'OTHER', 'UNKNOWN']).required(),
  stand: yup.string(),
  seasons: yup.array().of(yup.number().min(1).max(8)),
  occupation: yup.string(),
  isImortal: yup.boolean(),
  deathDate: yup.date(),
  deathBy: yup.string(),
  deathCause: yup.string(),
});

const compare = (str1, str2) => {
  const slugged1 = slugify(str1, {
    lower: true,
  });
  const slugged2 = slugify(str2, {
    lower: true,
  });
  return slugged1.includes(slugged2);
};

const compareGreaterThan = (characterAge, ageComparative) => {
  const comparativeYear = parseInt(ageComparative.slice(0, 4));
  const comparativeMonth = parseInt(ageComparative.slice(4, 6));
  const comparativeDay = parseInt(ageComparative.slice(6, 8));
  const birthYear = parseInt(characterAge.slice(0, 4));
  const birthMonth = parseInt(characterAge.slice(6, 8));
  const birthDay = parseInt(characterAge.slice(8, 10));
  console.log(birthYear, comparativeYear, birthMonth, comparativeMonth, birthDay, comparativeDay);
  if (birthYear > comparativeYear) {
    if (birthMonth >= comparativeMonth) {
      if (birthDay >= comparativeDay) {
        return true;
      }
    }
  }
  return false;
};

const compareLessThan = (characterAge, ageComparative) => {
  const comparativeYear = parseInt(ageComparative.slice(0, 4));
  const comparativeMonth = parseInt(ageComparative.slice(4, 6));
  const comparativeDay = parseInt(ageComparative.slice(6, 8));
  const birthYear = parseInt(characterAge.slice(0, 4));
  const birthMonth = parseInt(characterAge.slice(6, 8));
  const birthDay = parseInt(characterAge.slice(8, 10));
  console.log(birthYear, comparativeYear, birthMonth, comparativeMonth, birthDay, comparativeDay);
  if (birthYear < comparativeYear) {
    if (birthMonth >= comparativeMonth) {
      if (birthDay >= comparativeDay) {
        return true;
      }
    }
  }
  return false;
};

const compareBoolean = (urlBoolean) => {
  if (urlBoolean === 'true') {
    return true;
  }
  if (urlBoolean === 'false') {
    return false;
  }
  throw new Error('Character Boolean must be true or false');
};

const compareArrays = (array, str) => {
  const num = parseInt(str);
  return array.includes(num);
};

module.exports = {
  async readAll(ctx) {
    try {
      const results = [];
      const jsonPath = path.join(__dirname, '../jsons/jojos');
      const files = await readDir(jsonPath);
      const {
        limit = 20, offset = 0, fullname = '', gender = '', birthDate = '', isImortal = '', birthLocation = '', stand = '', occupation = '', slug = '', seasons = '',
      } = ctx.request.query;
      const fullnameCT = ctx.request.query['fullname.ct'];
      const birthDateLT = ctx.request.query['birthdate.lt'];
      const birthDateGT = ctx.request.query['birthdate.gt'];
      for (const filename of files) {
        const buffer = await readFile(path.join(__dirname, `../jsons/jojos/${filename}`));
        const result = JSON.parse(buffer.toString());
        results.push(result);
      }
      const filtered = results
        .filter((item) => (fullname !== '' ? item.fullName === fullname : true))
        .filter((item) => (gender !== '' ? item.gender === gender : true))
        .filter((item) => (occupation !== '' ? item.occupation === occupation.toLowerCase() : true))
        .filter((item) => (birthDate !== '' ? item.birthDate === birthDate : true))
        .filter((item) => (isImortal !== '' ? item.isImortal === compareBoolean(isImortal) : true))
        .filter((item) => (fullnameCT ? compare(item.fullName, fullnameCT) : true))
        .filter((item) => (seasons ? compareArrays(item.seasons, seasons) : true))
        .filter((item) => (slug ? compare(item.slug, slug) : true))
        .filter((item) => (birthLocation ? compare(item.birthLocation, birthLocation) : true))
        .filter((item) => (stand ? compare(item.stand, stand) : true))
        .filter((item) => (birthDateLT ? compareLessThan(item.birthDate, birthDateLT) : true))
        .filter((item) => (birthDateGT ? compareGreaterThan(item.birthDate, birthDateGT) : true));
      const offseted = filtered
        .filter((item, index) => index >= offset)
        .filter((item, index) => index < limit);
      ctx.body = {
        count: filtered.length,
        results: offseted,
      };
    } catch (error) {
      ctx.throw(403, error);
    }
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
    try {
      await jojoSchema.validate(json, { abortEarly: false });
      const slugedJson = slugify(json.fullName, {
        lower: true,
      });
      const name = slugedJson;
      json.slug = slugedJson;
      await writeFile(`src/jsons/jojos/${name}.json`, JSON.stringify(json, null, 4));
      ctx.status = 201;
      ctx.body = json;
    } catch (error) {
      ctx.throw(403, error);
    }
  },
  async update(ctx) {
    const { slug } = ctx.params;
    const filePath = `src/jsons/jojos/${slug}.json`;
    try {
      fs.unlinkSync(filePath);
      const json = ctx.request.body;
      await jojoSchema.validate(json, { abortEarly: false });
      const slugedJson = slugify(json.fullName, {
        lower: true,
      });
      json.slug = slugedJson;
      await writeFile(`src/jsons/jojos/${slugedJson}.json`, JSON.stringify(json, null, 4));
      ctx.body = json;
    } catch (error) {
      ctx.throw(403, error);
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
