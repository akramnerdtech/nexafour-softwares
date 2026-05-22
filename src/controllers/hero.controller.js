const Hero = require('../models/Hero.model');
const createCrudHandlers = require('../utils/crudFactory');

module.exports = createCrudHandlers(Hero);
