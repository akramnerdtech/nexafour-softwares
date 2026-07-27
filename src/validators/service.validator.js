const { body, param, query } = require('express-validator');
const { STATUSES } = require('../models/Service.model');

const idParam = [
  param('id').isMongoId(),
];

const slugParam = [
  param('slug')
    .trim()
    .notEmpty(),
];

const statusQuery = [
  query('status')
    .optional()
    .isIn(Object.values(STATUSES)),
];

const categoryQuery = [
  query('category')
    .optional()
    .isMongoId(),
];

const serviceCreateRules = [
  body('title').notEmpty(),

  body('category')
    .notEmpty()
    .isMongoId(),

  body('shortDescription')
    .notEmpty(),

  body('description')
    .notEmpty(),
];

const serviceUpdateRules = [
  param('id').isMongoId(),

  body('category')
    .optional()
    .isMongoId(),
];

module.exports = {
  idParam,
  slugParam,
  statusQuery,
  categoryQuery,
  serviceCreateRules,
  serviceUpdateRules,
};