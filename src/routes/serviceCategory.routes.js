const express = require('express');

const controller = require(
  '../controllers/serviceCategory.controller'
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
  idParam,
  createRules,
  updateRules,
} = require(
  '../validators/serviceCategory.validator'
);

const publicRouter = express.Router();

/**
 * PUBLIC ROUTES
 */

// GET ALL ACTIVE CATEGORIES
publicRouter.get(
  '/',
  controller.getAllPublic
);

// GET CATEGORY BY ID
publicRouter.get(
  '/:id',
  idParam,
  validate,
  controller.getById
);

/**
 * ADMIN ROUTES
 */

const adminRouter = express.Router();

adminRouter.use(authenticateAdmin);

// GET ALL CATEGORIES
adminRouter.get(
  '/',
  controller.getAll
);

// GET CATEGORY BY ID
adminRouter.get(
  '/:id',
  idParam,
  validate,
  controller.getById
);

// CREATE CATEGORY
adminRouter.post(
  '/',
  createRules,
  validate,
  controller.create
);

// UPDATE CATEGORY
adminRouter.patch(
  '/:id',
  updateRules,
  validate,
  controller.update
);

// DELETE CATEGORY
adminRouter.delete(
  '/:id',
  idParam,
  validate,
  controller.remove
);

module.exports = {
  publicRouter,
  adminRouter,
};