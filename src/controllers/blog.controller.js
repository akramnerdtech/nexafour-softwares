const Blog = require('../models/Blog.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../middleware/asyncHandler');

const sort = { publishedAt: -1, createdAt: -1 };

const buildPublicFilter = (query) => {
  const filter = { published: true };
  if (query.tag) {
    filter.tags = query.tag;
  }
  return filter;
};

const getAllPublic = asyncHandler(async (req, res) => {
  const blogs = await Blog.find(buildPublicFilter(req.query))
    .select('-content')
    .sort(sort);
  ApiResponse.success(res, blogs);
});

const getBySlugPublic = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({
    slug: req.params.slug,
    published: true,
  });

  if (!blog) {
    throw ApiError.notFound('Blog post not found');
  }

  ApiResponse.success(res, blog);
});

const getByIdPublic = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({
    _id: req.params.id,
    published: true,
  });

  if (!blog) {
    throw ApiError.notFound('Blog post not found');
  }

  ApiResponse.success(res, blog);
});

const getAll = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.query.published !== undefined) {
    filter.published = req.query.published === 'true';
  }

  if (req.query.tag) {
    filter.tags = req.query.tag;
  }

  const blogs = await Blog.find(filter).sort(sort);
  ApiResponse.success(res, blogs);
});

const getById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    throw ApiError.notFound('Blog post not found');
  }

  ApiResponse.success(res, blog);
});

const create = asyncHandler(async (req, res) => {
  const blog = await Blog.create(req.body);
  ApiResponse.created(res, blog, 'Blog post created');
});

const update = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!blog) {
    throw ApiError.notFound('Blog post not found');
  }

  ApiResponse.success(res, blog, 'Blog post updated');
});

const remove = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);

  if (!blog) {
    throw ApiError.notFound('Blog post not found');
  }

  ApiResponse.success(res, null, 'Blog post deleted');
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
