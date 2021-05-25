const connection = require('../config/database');

module.exports = {
  async readAll(ctx) {
    const {
      limit = 20, offset = 0, fullName = '', gender = '', countryName = '', birthDate = '', streetName = '', houseNumber = '', complement = '', district = '', cityName = '', stateName = '', zipcode = '', height = '', weight = '', familyMemberCount = '', motherName = '', fatherName = '', monthlyWage = '', email = '', phoneNumber = '', teamID = '', sportID = '',
    } = ctx.request.query;
    let queryBase = 'SELECT * FROM students WHERE 1 = 1 ';
    if (fullName) queryBase += ` AND fullName = "${fullName}"`;
    if (gender) queryBase += ` AND gender = "${gender}"`;
    if (countryName) queryBase += ` AND countryName = "${countryName}"`;
    if (birthDate) queryBase += ` AND birthDate = "${birthDate}"`;
    if (streetName) queryBase += ` AND streetName = "${streetName}"`;
    if (houseNumber) queryBase += ` AND houseNumber = "${houseNumber}"`;
    if (complement) queryBase += ` AND complement = "${complement}"`;
    if (district) queryBase += ` AND district = "${district}"`;
    if (cityName) queryBase += ` AND cityName = "${cityName}"`;
    if (stateName) queryBase += ` AND stateName = "${stateName}"`;
    if (zipcode) queryBase += ` AND zipcode = "${zipcode}"`;
    if (height) queryBase += ` AND height = "${height}"`;
    if (weight) queryBase += ` AND weight = "${weight}"`;
    if (familyMemberCount) queryBase += ` AND familyMemberCount = "${familyMemberCount}"`;
    if (motherName) queryBase += ` AND motherName = "${motherName}"`;
    if (fatherName) queryBase += ` AND fatherName = "${fatherName}"`;
    if (monthlyWage) queryBase += ` AND monthlyWage = "${monthlyWage}"`;
    if (email) queryBase += ` AND email = "${email}"`;
    if (phoneNumber) queryBase += ` AND phoneNumber = "${phoneNumber}"`;
    if (teamID) queryBase += ` AND teamID = "${teamID}"`;
    if (sportID) queryBase += ` AND sportID = "${sportID}"`;
    const fullnameCT = ctx.request.query['fullName.ct'];
    if (fullnameCT) queryBase += ` AND fullName LIKE '%${fullnameCT}%'`;
    const birthDateLT = ctx.request.query['birthDate.lt'];
    if (birthDateLT) queryBase += `AND birthDate < ${birthDateLT}`;
    // obs: não funciona e eu não sei o porque;
    const birthDateGT = ctx.request.query['birthDate.gt'];
    if (birthDateGT) queryBase += `AND birthDate > ${birthDateGT}`;
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
