const mongoose = require("mongoose");

const statSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    value: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const homeSchema = new mongoose.Schema(
  {
    homeTitle: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },

    homeDescription: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },

    stats: {
      type: [statSchema],
      default: [
        {
          title: "Products Shipped",
          value: "200+",
        },
        {
          title: "Global Clients",
          value: "50+",
        },
        {
          title: "Years In Making",
          value: "10+",
        },
        {
          title: "Average Client Rating",
          value: "4.9/5",
        },
      ],
    },

    section2Title: {
      type: String,
      trim: true,
      default: "",
    },

    section2Description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Home",
  homeSchema
);