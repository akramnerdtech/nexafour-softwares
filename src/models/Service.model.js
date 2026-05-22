const mongoose = require('mongoose');

const STATUSES = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
};

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-friendly'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: [300, 'Short description cannot exceed 300 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [5000, 'Description cannot exceed 5000 characters'],
    },
    icon: {
      type: String,
      trim: true,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: {
        values: Object.values(STATUSES),
        message: '{VALUE} is not a valid status',
      },
      default: STATUSES.DRAFT,
    },
  },
  { timestamps: true }
);

serviceSchema.pre('validate', async function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title);
  }

  if (this.slug) {
    this.slug = slugify(this.slug);
    const existing = await mongoose.models.Service.findOne({
      slug: this.slug,
      _id: { $ne: this._id },
    });
    if (existing) {
      this.slug = `${this.slug}-${Date.now()}`;
    }
  }

  next();
});

module.exports = mongoose.model('Service', serviceSchema);
module.exports.STATUSES = STATUSES;
module.exports.slugify = slugify;
