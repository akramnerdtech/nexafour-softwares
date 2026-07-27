const { body } = require('express-validator');

const updateRules = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required'),

  body('phone')
    .notEmpty()
    .withMessage('Phone is required'),

  body('officeAddress')
    .notEmpty()
    .withMessage('Office address is required'),

  body('mapUrl')
    .optional()
    .trim(),

  body('workingHours')
    .optional()
    .trim(),
];

module.exports = {
  updateRules,
};