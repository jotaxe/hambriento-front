// Initializes the `sellers` service on path `/sellers`
const createService = require('feathers-nedb');
const createModel = require('../../models/sellers.model');
const hooks = require('./sellers.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/sellers', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('sellers');

  service.hooks(hooks);
};
