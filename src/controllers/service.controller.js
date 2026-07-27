const Service = require('../models/Service.model');
const ServiceCategory = require('../models/ServiceCategory.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../middleware/asyncHandler');

const sort = { createdAt: -1 };

const getAllPublic = asyncHandler(async (req, res) => {
  const filter = {
    status: 'published',
  };

  if (req.query.category) {
    filter.category = req.query.category;
  }

  const services = await Service.find(filter)
    .populate('category')
    .sort(sort);

  ApiResponse.success(res, services);
});

const getBySlugPublic = asyncHandler(async (req, res) => {
  const service = await Service.findOne({
    slug: req.params.slug,
    status: 'published',
  }).populate('category');

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

  if (req.query.category) {
    filter.category = req.query.category;
  }

  const services = await Service.find(filter)
    .populate('category')
    .sort(sort);

  ApiResponse.success(res, services);
});

const getById = asyncHandler(async (req, res) => {
  const service = await Service.findById(
    req.params.id
  ).populate('category');

  if (!service) {
    throw ApiError.notFound('Service not found');
  }

  ApiResponse.success(res, service);
});

const create = asyncHandler(async (req, res) => {
  const category =
    await ServiceCategory.findById(
      req.body.category
    );

  if (!category) {
    throw ApiError.badRequest(
      'Invalid category'
    );
  }

  const service = await Service.create(req.body);

  ApiResponse.created(
    res,
    service,
    'Service created'
  );
});

const update = asyncHandler(async (req, res) => {
  if (req.body.category) {
    const category =
      await ServiceCategory.findById(
        req.body.category
      );

    if (!category) {
      throw ApiError.badRequest(
        'Invalid category'
      );
    }
  }

  const service =
    await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate('category');

  if (!service) {
    throw ApiError.notFound('Service not found');
  }

  ApiResponse.success(
    res,
    service,
    'Service updated'
  );
});

const remove = asyncHandler(async (req, res) => {
  const service =
    await Service.findByIdAndDelete(
      req.params.id
    );

  if (!service) {
    throw ApiError.notFound('Service not found');
  }

  ApiResponse.success(
    res,
    null,
    'Service deleted'
  );
});

module.exports = {
  getAllPublic,
  getBySlugPublic,
  getAll,
  getById,
  create,
  update,
  remove,
};