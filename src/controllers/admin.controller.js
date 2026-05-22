const User = require('../models/User.model');
const Admin = require('../models/Admin.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../middleware/asyncHandler');

const getDashboard = asyncHandler(async (_req, res) => {
  const [totalUsers, totalAdmins, activeUsers] = await Promise.all([
    User.countDocuments(),
    Admin.countDocuments(),
    User.countDocuments({ isActive: true }),
  ]);

  ApiResponse.success(res, {
    stats: {
      totalUsers,
      activeUsers,
      totalAdmins,
    },
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
    User.countDocuments(),
  ]);

  ApiResponse.paginated(res, users, {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw ApiError.notFound('User not found');
  }

  ApiResponse.success(res, { user });
});

const updateUser = asyncHandler(async (req, res) => {
  const { name, email, isActive } = req.body;
  const updates = {};

  if (name !== undefined) updates.name = name;
  if (email !== undefined) updates.email = email;
  if (isActive !== undefined) updates.isActive = isActive;

  const user = await User.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw ApiError.notFound('User not found');
  }

  ApiResponse.success(res, { user }, 'User updated');
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    throw ApiError.notFound('User not found');
  }

  ApiResponse.success(res, null, 'User deleted');
});

module.exports = { getDashboard, getUsers, getUserById, updateUser, deleteUser };
