const aboutController = require('../controllers/about.controller');
const createResourceRoutes = require('./createResourceRoutes');
const {
  aboutCreateRules,
  aboutUpdateRules,
  idParam,
} = require('../validators/content.validator');

module.exports = createResourceRoutes(aboutController, {
  createRules: aboutCreateRules,
  updateRules: aboutUpdateRules,
  idParam,
});
