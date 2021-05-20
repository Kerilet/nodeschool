const connection = require('../config/database');

module.exports = {
  async readAll(ctx) {
    const {
      limit = 20, offset = 0, gender = '', countryName = '', // birthDate = '', isImortal = '', birthLocation = '', stand = '', occupation = '', slug = '', // seasons = [],
    } = ctx.request.query;
    let queryBase = 'SELECT * FROM students WHERE 1 = 1 ';
    if (gender) queryBase += ` AND gender = "${gender}"`;
    if (countryName) queryBase += ` AND countryName = "${countryName}"`;
    const queryLimited = `${queryBase} LIMIT ${limit} OFFSET ${offset}`;
    // eslint-disable-next-line no-console
    console.log(queryLimited);
    const promisePool = connection.promise();
    const [count] = await promisePool.query(queryBase.replace('SELECT *', 'SELECT COUNT(*) AS total'));
    const [results] = await promisePool.query(queryLimited);
    ctx.body = {
      count: count[0].total,
      results,
    };
  },
};
