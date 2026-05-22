const mongoose = require('mongoose');
const slugify = require('../utils/slugify');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-friendly'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    featuredImage: {
      type: String,
      default: null,
    },
    metaTitle: {
      type: String,
      trim: true,
      maxlength: [70, 'Meta title cannot exceed 70 characters'],
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'Meta description cannot exceed 160 characters'],
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: (tags) => tags.length <= 20,
        message: 'Cannot have more than 20 tags',
      },
    },
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

blogSchema.pre('validate', async function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title);
  }

  if (this.slug) {
    this.slug = slugify(this.slug);
    const existing = await this.constructor.findOne({
      slug: this.slug,
      _id: { $ne: this._id },
    });
    if (existing) {
      this.slug = `${this.slug}-${Date.now()}`;
    }
  }

  if (this.isModified('published')) {
    if (this.published && !this.publishedAt) {
      this.publishedAt = new Date();
    }
    if (!this.published) {
      this.publishedAt = null;
    }
  }

  next();
});

blogSchema.index({ published: 1, createdAt: -1 });
blogSchema.index({ tags: 1 });

module.exports = mongoose.model('Blog', blogSchema);
