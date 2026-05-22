const User = require('../models/User.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../middleware/asyncHandler');

const updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const updates = {};

  if (name) updates.name = name;
  if (email) {
    const existing = await User.findOne({ email, _id: { $ne: req.user._id } });
    if (existing) throw ApiError.conflict('Email is already in use');
    updates.email = email;
  }

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  });

  ApiResponse.success(res, { user }, 'Profile updated');
});

module.exports = { updateProfile };
