const express = require('express');
const serviceController = require('../controllers/service.controller');
const validate = require('../middleware/validate.middleware');
const { authenticateAdmin } = require('../middleware/adminAuth.middleware');
const {
  idParam,
  slugParam,
  statusQuery,
  serviceCreateRules,
  serviceUpdateRules,
} = require('../validators/service.validator');

const publicRouter = express.Router();

publicRouter.get('/', serviceController.getAllPublic);
publicRouter.get('/slug/:slug', slugParam, validate, serviceController.getBySlugPublic);
publicRouter.get('/:id', idParam, validate, serviceController.getByIdPublic);

const adminRouter = express.Router();

adminRouter.use(authenticateAdmin);
adminRouter.get('/', statusQuery, validate, serviceController.getAll);
adminRouter.get('/:id', idParam, validate, serviceController.getById);
adminRouter.post('/', serviceCreateRules, validate, serviceController.create);
adminRouter.patch('/:id', serviceUpdateRules, validate, serviceController.update);
adminRouter.delete('/:id', idParam, validate, serviceController.remove);

module.exports = { publicRouter, adminRouter };
