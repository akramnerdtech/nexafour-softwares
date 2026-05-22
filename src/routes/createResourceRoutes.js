const express = require('express');
const validate = require('../middleware/validate.middleware');
const { authenticateAdmin } = require('../middleware/adminAuth.middleware');

const createResourceRoutes = (controller, { createRules, updateRules, idParam }) => {
  const publicRouter = express.Router();
  publicRouter.get('/', controller.getAllPublic);
  publicRouter.get('/:id', idParam, validate, controller.getByIdPublic);

  const adminRouter = express.Router();
  adminRouter.use(authenticateAdmin);
  adminRouter.get('/', controller.getAll);
  adminRouter.get('/:id', idParam, validate, controller.getById);
  adminRouter.post('/', createRules, validate, controller.create);
  adminRouter.patch('/:id', updateRules, validate, controller.update);
  adminRouter.delete('/:id', idParam, validate, controller.remove);

  return { publicRouter, adminRouter };
};

module.exports = createResourceRoutes;
