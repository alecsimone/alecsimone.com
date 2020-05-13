const { me } = require('./Query/MemberQueries');
const { exercises } = require('./Query/PageQueries');

const Query = {
   me,
   exercises
};

module.exports = Query;
