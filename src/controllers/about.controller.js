const About = require('../models/About.model');
const createCrudHandlers = require('../utils/crudFactory');

module.exports = createCrudHandlers(About, { hasOrder: false });
