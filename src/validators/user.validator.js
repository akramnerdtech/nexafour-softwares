const { body, param } = require('express-validator');

const updateProfileRules = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty').isLength({ max: 100 }),
  body('email').optional().trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
];

const updateUserRules = [
  param('id').isMongoId().withMessage('Invalid user ID'),
  body('name').optional().trim().notEmpty().isLength({ max: 100 }),
  body('email').optional().trim().isEmail().normalizeEmail(),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
];

const userIdParam = [param('id').isMongoId().withMessage('Invalid user ID')];

module.exports = { updateProfileRules, updateUserRules, userIdParam };
