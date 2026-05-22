const { body, param } = require('express-validator');

const idParam = [param('id').isMongoId().withMessage('Invalid ID')];

const heroCreateRules = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }),
  body('subtitle').optional().trim().isLength({ max: 300 }),
  body('description').optional().trim().isLength({ max: 1000 }),
  body('ctaText').optional().trim().isLength({ max: 50 }),
  body('ctaLink').optional().trim(),
  body('backgroundImage').optional().trim(),
  body('order').optional().isInt({ min: 0 }).withMessage('Order must be a non-negative integer'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
];

const heroUpdateRules = [
  param('id').isMongoId().withMessage('Invalid ID'),
  body('title').optional().trim().notEmpty().isLength({ max: 200 }),
  body('subtitle').optional().trim().isLength({ max: 300 }),
  body('description').optional().trim().isLength({ max: 1000 }),
  body('ctaText').optional().trim().isLength({ max: 50 }),
  body('ctaLink').optional().trim(),
  body('backgroundImage').optional().trim(),
  body('order').optional().isInt({ min: 0 }),
  body('isActive').optional().isBoolean(),
];

const aboutCreateRules = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }),
  body('subtitle').optional().trim().isLength({ max: 300 }),
  body('description').trim().notEmpty().withMessage('Description is required').isLength({ max: 5000 }),
  body('image').optional().trim(),
  body('features').optional().isArray().withMessage('Features must be an array'),
  body('features.*.title').optional().trim().notEmpty().withMessage('Feature title is required'),
  body('features.*.description').optional().trim(),
  body('features.*.icon').optional().trim(),
  body('isActive').optional().isBoolean(),
];

const aboutUpdateRules = [
  param('id').isMongoId().withMessage('Invalid ID'),
  body('title').optional().trim().notEmpty().isLength({ max: 200 }),
  body('subtitle').optional().trim().isLength({ max: 300 }),
  body('description').optional().trim().notEmpty().isLength({ max: 5000 }),
  body('image').optional().trim(),
  body('features').optional().isArray(),
  body('features.*.title').optional().trim().notEmpty(),
  body('features.*.description').optional().trim(),
  body('features.*.icon').optional().trim(),
  body('isActive').optional().isBoolean(),
];

const testimonialCreateRules = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('designation').optional().trim().isLength({ max: 100 }),
  body('company').optional().trim().isLength({ max: 100 }),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 1000 }),
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('image').optional().trim(),
  body('order').optional().isInt({ min: 0 }),
  body('isActive').optional().isBoolean(),
];

const testimonialUpdateRules = [
  param('id').isMongoId().withMessage('Invalid ID'),
  body('name').optional().trim().notEmpty().isLength({ max: 100 }),
  body('designation').optional().trim().isLength({ max: 100 }),
  body('company').optional().trim().isLength({ max: 100 }),
  body('message').optional().trim().notEmpty().isLength({ max: 1000 }),
  body('rating').optional().isInt({ min: 1, max: 5 }),
  body('image').optional().trim(),
  body('order').optional().isInt({ min: 0 }),
  body('isActive').optional().isBoolean(),
];

const teamMemberCreateRules = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('designation').trim().notEmpty().withMessage('Designation is required').isLength({ max: 100 }),
  body('bio').optional().trim().isLength({ max: 1000 }),
  body('image').optional().trim(),
  body('socialLinks').optional().isObject(),
  body('socialLinks.linkedin').optional().trim().isURL(),
  body('socialLinks.twitter').optional().trim().isURL(),
  body('socialLinks.github').optional().trim().isURL(),
  body('socialLinks.email').optional().trim().isEmail(),
  body('order').optional().isInt({ min: 0 }),
  body('isActive').optional().isBoolean(),
];

const teamMemberUpdateRules = [
  param('id').isMongoId().withMessage('Invalid ID'),
  body('name').optional().trim().notEmpty().isLength({ max: 100 }),
  body('designation').optional().trim().notEmpty().isLength({ max: 100 }),
  body('bio').optional().trim().isLength({ max: 1000 }),
  body('image').optional().trim(),
  body('socialLinks').optional().isObject(),
  body('socialLinks.linkedin').optional().trim().isURL(),
  body('socialLinks.twitter').optional().trim().isURL(),
  body('socialLinks.github').optional().trim().isURL(),
  body('socialLinks.email').optional().trim().isEmail(),
  body('order').optional().isInt({ min: 0 }),
  body('isActive').optional().isBoolean(),
];

module.exports = {
  idParam,
  heroCreateRules,
  heroUpdateRules,
  aboutCreateRules,
  aboutUpdateRules,
  testimonialCreateRules,
  testimonialUpdateRules,
  teamMemberCreateRules,
  teamMemberUpdateRules,
};
