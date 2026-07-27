const { body, param } = require('express-validator');

const idParam = [
  param('id')
    .isMongoId()
    .withMessage('Invalid category ID'),
];

const createRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ max: 100 })
    .withMessage(
      'Category name cannot exceed 100 characters'
    ),

  body('description')
    .optional()
    .trim(),

  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage(
      'Order must be a positive number'
    ),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage(
      'isActive must be true or false'
    ),
];

const updateRules = [
  ...idParam,

  body('name')
    .optional()
    .trim()
    .notEmpty()
    .isLength({ max: 100 }),

  body('description')
    .optional()
    .trim(),

  body('order')
    .optional()
    .isInt({ min: 0 }),

  body('isActive')
    .optional()
    .isBoolean(),
];

module.exports = {
  idParam,
  createRules,
  updateRules,
};