const { body, param, query } = require('express-validator');
const { STATUSES } = require('../models/Service.model');

const idParam = [param('id').isMongoId().withMessage('Invalid service ID')];

const slugParam = [
  param('slug')
    .trim()
    .notEmpty()
    .withMessage('Slug is required')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('Invalid slug format'),
];

const statusQuery = [
  query('status')
    .optional()
    .isIn(Object.values(STATUSES))
    .withMessage('Invalid status filter'),
];

const serviceCreateRules = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 150 }),
  body('slug')
    .optional()
    .trim()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('Slug must be URL-friendly (lowercase, hyphens)'),
  body('shortDescription')
    .trim()
    .notEmpty()
    .withMessage('Short description is required')
    .isLength({ max: 300 }),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 5000 }),
  body('icon').optional().trim(),
  body('image').optional().trim(),
  body('status')
    .optional()
    .isIn(Object.values(STATUSES))
    .withMessage('Status must be draft, published, or archived'),
];

const serviceUpdateRules = [
  param('id').isMongoId().withMessage('Invalid service ID'),
  body('title').optional().trim().notEmpty().isLength({ max: 150 }),
  body('slug')
    .optional()
    .trim()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('Slug must be URL-friendly'),
  body('shortDescription').optional().trim().notEmpty().isLength({ max: 300 }),
  body('description').optional().trim().notEmpty().isLength({ max: 5000 }),
  body('icon').optional().trim(),
  body('image').optional().trim(),
  body('status')
    .optional()
    .isIn(Object.values(STATUSES))
    .withMessage('Status must be draft, published, or archived'),
];

module.exports = {
  idParam,
  slugParam,
  statusQuery,
  serviceCreateRules,
  serviceUpdateRules,
};
