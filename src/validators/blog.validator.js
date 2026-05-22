const { body, param, query } = require('express-validator');

const idParam = [param('id').isMongoId().withMessage('Invalid blog ID')];

const slugParam = [
  param('slug')
    .trim()
    .notEmpty()
    .withMessage('Slug is required')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('Invalid slug format'),
];

const publishedQuery = [
  query('published')
    .optional()
    .isIn(['true', 'false'])
    .withMessage('published must be true or false'),
];

const tagQuery = [
  query('tag').optional().trim().notEmpty().withMessage('Tag cannot be empty'),
];

const blogCreateRules = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }),
  body('slug')
    .optional()
    .trim()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('Slug must be URL-friendly'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('featuredImage').optional().trim(),
  body('metaTitle').optional().trim().isLength({ max: 70 }),
  body('metaDescription').optional().trim().isLength({ max: 160 }),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('tags.*').optional().trim().notEmpty().withMessage('Tag cannot be empty'),
  body('published').optional().isBoolean().withMessage('published must be a boolean'),
];

const blogUpdateRules = [
  param('id').isMongoId().withMessage('Invalid blog ID'),
  body('title').optional().trim().notEmpty().isLength({ max: 200 }),
  body('slug')
    .optional()
    .trim()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('Slug must be URL-friendly'),
  body('content').optional().trim().notEmpty(),
  body('featuredImage').optional().trim(),
  body('metaTitle').optional().trim().isLength({ max: 70 }),
  body('metaDescription').optional().trim().isLength({ max: 160 }),
  body('tags').optional().isArray(),
  body('tags.*').optional().trim().notEmpty(),
  body('published').optional().isBoolean(),
];

module.exports = {
  idParam,
  slugParam,
  publishedQuery,
  tagQuery,
  blogCreateRules,
  blogUpdateRules,
};
