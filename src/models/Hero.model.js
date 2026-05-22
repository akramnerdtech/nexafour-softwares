const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    subtitle: {
      type: String,
      trim: true,
      maxlength: [300, 'Subtitle cannot exceed 300 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    ctaText: {
      type: String,
      trim: true,
      maxlength: [50, 'CTA text cannot exceed 50 characters'],
    },
    ctaLink: {
      type: String,
      trim: true,
    },
    backgroundImage: {
      type: String,
      default: null,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hero', heroSchema);
