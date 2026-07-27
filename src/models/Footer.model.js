const mongoose = require('mongoose');

const footerLinkSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },

    to: {
      type: String,
      required: true,
      trim: true,
    },

    external: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  }
);

const footerColumnSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    links: [footerLinkSchema],
  },
  {
    _id: false,
  }
);

const footerSchema = new mongoose.Schema(
  {
    columns: {
      type: [footerColumnSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  'Footer',
  footerSchema
);