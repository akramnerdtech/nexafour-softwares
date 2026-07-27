const express = require('express');

const controller = require(
  '../controllers/footer.controller'
);

const validate = require(
  '../middleware/validate.middleware'
);

const {
  authenticateAdmin,
} = require(
  '../middleware/adminAuth.middleware'
);

const {
  footerUpdateRules,
} = require(
  '../validators/footer.validator'
);

// PUBLIC

const publicRouter = express.Router();

publicRouter.get(
  '/',
  controller.getFooter
);

// ADMIN

const adminRouter = express.Router();

adminRouter.use(authenticateAdmin);

adminRouter.put(
  '/',
  footerUpdateRules,
  validate,
  controller.updateFooter
);

module.exports = {
  publicRouter,
  adminRouter,
};