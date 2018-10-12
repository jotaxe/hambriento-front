const users = require('./users/users.service.js');
const sellers = require('./sellers/sellers.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(sellers);
};
