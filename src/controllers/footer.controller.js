const Footer = require('../models/Footer.model');

const getFooter = async (req, res) => {
  const footer = await Footer.findOne();

  res.status(200).json({
    success: true,
    data: footer,
  });
};

const updateFooter = async (req, res) => {
  let footer = await Footer.findOne();

  if (!footer) {
    footer = await Footer.create(req.body);
  } else {
    footer = await Footer.findByIdAndUpdate(
      footer._id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  res.status(200).json({
    success: true,
    message: 'Footer updated successfully',
    data: footer,
  });
};

module.exports = {
  getFooter,
  updateFooter,
};