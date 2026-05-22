const express = require('express');
const contactController = require('../controllers/contact.controller');
const validate = require('../middleware/validate.middleware');
const { authenticateAdmin } = require('../middleware/adminAuth.middleware');
const {
  idParam,
  contactSubmitRules,
  isReadQuery,
  markReadRules,
} = require('../validators/contact.validator');

const publicRouter = express.Router();

publicRouter.post('/', contactSubmitRules, validate, contactController.submit);

const adminRouter = express.Router();

adminRouter.use(authenticateAdmin);
adminRouter.get('/', isReadQuery, validate, contactController.getAll);
adminRouter.get('/:id', idParam, validate, contactController.getById);
adminRouter.patch('/:id/read', markReadRules, validate, contactController.markRead);
adminRouter.delete('/:id', idParam, validate, contactController.remove);

module.exports = { publicRouter, adminRouter };
