const ApiError = require('./ApiError');
const ApiResponse = require('./ApiResponse');
const asyncHandler = require('../middleware/asyncHandler');

const sortOptions = (hasOrder) =>
  hasOrder ? { order: 1, createdAt: -1 } : { createdAt: -1 };

const createCrudHandlers = (Model, { hasOrder = true } = {}) => {
  const sort = sortOptions(hasOrder);

  const getAllPublic = asyncHandler(async (_req, res) => {
    const items = await Model.find({ isActive: true }).sort(sort);
    ApiResponse.success(res, items);
  });

  const getByIdPublic = asyncHandler(async (req, res) => {
    const item = await Model.findOne({ _id: req.params.id, isActive: true });
    if (!item) throw ApiError.notFound('Resource not found');
    ApiResponse.success(res, item);
  });

  const getAll = asyncHandler(async (_req, res) => {
    const items = await Model.find().sort(sort);
    ApiResponse.success(res, items);
  });

  const getById = asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);
    if (!item) throw ApiError.notFound('Resource not found');
    ApiResponse.success(res, item);
  });

  const create = asyncHandler(async (req, res) => {
    const item = await Model.create(req.body);
    ApiResponse.created(res, item);
  });

  const update = asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) throw ApiError.notFound('Resource not found');
    ApiResponse.success(res, item, 'Updated successfully');
  });

  const remove = asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) throw ApiError.notFound('Resource not found');
    ApiResponse.success(res, null, 'Deleted successfully');
  });

  return {
    getAllPublic,
    getByIdPublic,
    getAll,
    getById,
    create,
    update,
    remove,
  };
};

module.exports = createCrudHandlers;
