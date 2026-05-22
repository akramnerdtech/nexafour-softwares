const path = require('path');
const fs = require('fs');
const User = require('../models/User.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../middleware/asyncHandler');
const { upload: uploadConfig } = require('../config/env');

const uploadAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw ApiError.badRequest('No file uploaded');
  }

  const filePath = path.join(uploadConfig.dir, req.file.filename).replace(/\\/g, '/');

  if (req.user.avatar) {
    const oldPath = path.resolve(process.cwd(), req.user.avatar);
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatar: filePath },
    { new: true }
  );

  ApiResponse.success(res, { user, file: { filename: req.file.filename, path: filePath } }, 'File uploaded');
});

module.exports = { uploadAvatar };
