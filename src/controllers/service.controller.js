const Service = require('../models/Service.model');
const { STATUSES } = require('../models/Service.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../middleware/asyncHandler');

const sort = { createdAt: -1 };

const getAllPublic = asyncHandler(async (_req, res) => {
  const services = await Service.find({ status: STATUSES.PUBLISHED }).sort(sort);
  ApiResponse.success(res, services);
});

const getBySlugPublic = asyncHandler(async (req, res) => {
  const service = await Service.findOne({
    slug: req.params.slug,
    status: STATUSES.PUBLISHED,
  });

  if (!service) {
    throw ApiError.notFound('Service not found');
  }

  ApiResponse.success(res, service);
});

const getByIdPublic = asyncHandler(async (req, res) => {
  const service = await Service.findOne({
    _id: req.params.id,
    status: STATUSES.PUBLISHED,
  });

  if (!service) {
    throw ApiError.notFound('Service not found');
  }

  ApiResponse.success(res, service);
});

const getAll = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) {
    filter.status = req.query.status;
  }

  const services = await Service.find(filter).sort(sort);
  ApiResponse.success(res, services);
});

const getById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    throw ApiError.notFound('Service not found');
  }

  ApiResponse.success(res, service);
});

const create = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);
  ApiResponse.created(res, service, 'Service created');
});

const update = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!service) {
    throw ApiError.notFound('Service not found');
  }

  ApiResponse.success(res, service, 'Service updated');
});

const remove = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);

  if (!service) {
    throw ApiError.notFound('Service not found');
  }

  ApiResponse.success(res, null, 'Service deleted');
});

module.exports = {
  getAllPublic,
  getBySlugPublic,
  getByIdPublic,
  getAll,
  getById,
  create,
  update,
  remove,
};
