const { body, param, query } = require('express-validator');

const idParam = [param('id').isMongoId().withMessage('Invalid contact ID')];

const contactSubmitRules = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone cannot exceed 20 characters')
    .matches(/^[+]?[\d\s()-]+$/)
    .withMessage('Please provide a valid phone number'),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
];

const isReadQuery = [
  query('isRead')
    .optional()
    .isIn(['true', 'false'])
    .withMessage('isRead must be true or false'),
];

const markReadRules = [
  param('id').isMongoId().withMessage('Invalid contact ID'),
  body('isRead').isBoolean().withMessage('isRead must be a boolean'),
];

module.exports = {
  idParam,
  contactSubmitRules,
  isReadQuery,
  markReadRules,
};
