const Admin = require('../models/Admin.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const { signAdminToken } = require('../utils/jwt');
const asyncHandler = require('../middleware/asyncHandler');

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email }).select('+password');

  if (!admin || !(await admin.comparePassword(password))) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  if (!admin.isActive) {
    throw ApiError.forbidden('Admin account is deactivated');
  }

  admin.lastLogin = new Date();
  await admin.save({ validateBeforeSave: false });

  admin.password = undefined;

  const token = signAdminToken(admin);

  ApiResponse.success(res, { admin, token }, 'Admin login successful');
});

const getMe = asyncHandler(async (req, res) => {
  ApiResponse.success(res, { admin: req.admin });
});

module.exports = { login, getMe };
