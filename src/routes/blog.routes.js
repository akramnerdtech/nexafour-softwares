const express = require('express');
const blogController = require('../controllers/blog.controller');
const validate = require('../middleware/validate.middleware');
const { authenticateAdmin } = require('../middleware/adminAuth.middleware');
const {
  idParam,
  slugParam,
  publishedQuery,
  tagQuery,
  blogCreateRules,
  blogUpdateRules,
} = require('../validators/blog.validator');

const publicRouter = express.Router();

publicRouter.get('/', tagQuery, validate, blogController.getAllPublic);
publicRouter.get('/slug/:slug', slugParam, validate, blogController.getBySlugPublic);
publicRouter.get('/:id', idParam, validate, blogController.getByIdPublic);

const adminRouter = express.Router();

adminRouter.use(authenticateAdmin);
adminRouter.get('/', publishedQuery, tagQuery, validate, blogController.getAll);
adminRouter.get('/:id', idParam, validate, blogController.getById);
adminRouter.post('/', blogCreateRules, validate, blogController.create);
adminRouter.patch('/:id', blogUpdateRules, validate, blogController.update);
adminRouter.delete('/:id', idParam, validate, blogController.remove);

module.exports = { publicRouter, adminRouter };
