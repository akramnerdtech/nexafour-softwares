const testimonialController = require('../controllers/testimonial.controller');
const createResourceRoutes = require('./createResourceRoutes');
const {
  testimonialCreateRules,
  testimonialUpdateRules,
  idParam,
} = require('../validators/content.validator');

module.exports = createResourceRoutes(testimonialController, {
  createRules: testimonialCreateRules,
  updateRules: testimonialUpdateRules,
  idParam,
});
