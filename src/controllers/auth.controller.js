const User = require('../models/User.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const { signUserToken } = require('../utils/jwt');
const asyncHandler = require('../middleware/asyncHandler');

const buildAuthResponse = (user) => {
  const token = signUserToken(user);
  return { user, token };
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw ApiError.conflict('Email is already registered');
  }

  const user = await User.create({ name, email, password });
  const data = buildAuthResponse(user);

  ApiResponse.created(res, data, 'Registration successful');
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  if (!user.isActive) {
    throw ApiError.forbidden('Account is deactivated');
  }

  user.password = undefined;
  const data = buildAuthResponse(user);

  ApiResponse.success(res, data, 'Login successful');
});

const getMe = asyncHandler(async (req, res) => {
  ApiResponse.success(res, { user: req.user });
});

module.exports = { register, login, getMe };
