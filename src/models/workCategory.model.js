const mongoose = require("mongoose");

const workCategorySchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Category name is required"],
        unique: true,
        trim: true,
        maxlength: 100,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "WorkCategory",
  workCategorySchema
);