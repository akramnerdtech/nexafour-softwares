const Contact = require('../models/Contact.model');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../middleware/asyncHandler');

const getPublic = asyncHandler(async (_req, res) => {
  const contact = await Contact.findOne();

  ApiResponse.success(res, contact);
});

const getAdmin = asyncHandler(async (_req, res) => {
  const contact = await Contact.findOne();

  ApiResponse.success(res, contact);
});

const update = asyncHandler(async (req, res) => {
  let contact = await Contact.findOne();

  if (!contact) {
    contact = await Contact.create(req.body);
  } else {
    contact = await Contact.findByIdAndUpdate(
      contact._id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  ApiResponse.success(
    res,
    contact,
    'Contact updated successfully'
  );
});

module.exports = {
  getPublic,
  getAdmin,
  update,
};