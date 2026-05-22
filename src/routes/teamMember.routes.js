const teamMemberController = require('../controllers/teamMember.controller');
const createResourceRoutes = require('./createResourceRoutes');
const {
  teamMemberCreateRules,
  teamMemberUpdateRules,
  idParam,
} = require('../validators/content.validator');

module.exports = createResourceRoutes(teamMemberController, {
  createRules: teamMemberCreateRules,
  updateRules: teamMemberUpdateRules,
  idParam,
});
