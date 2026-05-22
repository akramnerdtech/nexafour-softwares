const Testimonial = require('../models/Testimonial.model');
const createCrudHandlers = require('../utils/crudFactory');

module.exports = createCrudHandlers(Testimonial);
