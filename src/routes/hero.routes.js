const heroController = require('../controllers/hero.controller');
const createResourceRoutes = require('./createResourceRoutes');
const {
  heroCreateRules,
  heroUpdateRules,
  idParam,
} = require('../validators/content.validator');

module.exports = createResourceRoutes(heroController, {
  createRules: heroCreateRules,
  updateRules: heroUpdateRules,
  idParam,
});
