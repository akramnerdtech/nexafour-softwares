const { body } = require('express-validator');

const footerUpdateRules = [
  body('columns')
    .isArray()
    .withMessage('Columns must be an array'),
];

module.exports = {
  footerUpdateRules,
};