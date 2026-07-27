const ServiceCategory = require('../models/ServiceCategory.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * PUBLIC
 */
const getAllPublic = asyncHandler(async (_req, res) => {
  const categories = await ServiceCategory.find({
    isActive: true,
  }).sort({
    order: 1,
    createdAt: -1,
  });

  ApiResponse.success(res, categories);
});

/**
 * ADMIN
 */
const getAll = asyncHandler(async (_req, res) => {
  const categories = await ServiceCategory.find().sort({
    order: 1,
    createdAt: -1,
  });

  ApiResponse.success(res, categories);
});

const getById = asyncHandler(async (req, res) => {
  const category = await ServiceCategory.findById(
    req.params.id
  );

  if (!category) {
    throw ApiError.notFound(
      'Category not found'
    );
  }

  ApiResponse.success(res, category);
});

const create = asyncHandler(async (req, res) => {
  const category = await ServiceCategory.create(
    req.body
  );

  ApiResponse.created(
    res,
    category,
    'Category created'
  );
});

const update = asyncHandler(async (req, res) => {
  const category =
    await ServiceCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

  if (!category) {
    throw ApiError.notFound(
      'Category not found'
    );
  }

  ApiResponse.success(
    res,
    category,
    'Category updated'
  );
});

const remove = asyncHandler(async (req, res) => {
  const category =
    await ServiceCategory.findByIdAndDelete(
      req.params.id
    );

  if (!category) {
    throw ApiError.notFound(
      'Category not found'
    );
  }

  ApiResponse.success(
    res,
    null,
    'Category deleted'
  );
});

module.exports = {
  getAllPublic,
  getAll,
  getById,
  create,
  update,
  remove,
};