const TeamMember = require('../models/TeamMember.model');
const createCrudHandlers = require('../utils/crudFactory');

module.exports = createCrudHandlers(TeamMember);
