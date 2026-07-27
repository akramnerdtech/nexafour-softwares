const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },

    officeAddress: {
      type: String,
      required: [true, 'Office address is required'],
      trim: true,
    },

    mapUrl: {
      type: String,
      default: null,
      trim: true,
    },

    workingHours: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  'Contact',
  contactSchema
);