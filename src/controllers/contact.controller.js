const Contact = require('../models/Contact.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../middleware/asyncHandler');

const submit = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;

  const contact = await Contact.create({ name, email, phone, message });

  ApiResponse.created(res, { id: contact._id }, 'Message sent successfully');
});

const getAll = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.isRead !== undefined) {
    filter.isRead = req.query.isRead === 'true';
  }

  const [submissions, total] = await Promise.all([
    Contact.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
    Contact.countDocuments(filter),
  ]);

  ApiResponse.paginated(res, submissions, {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
  });
});

const getById = asyncHandler(async (req, res) => {
  const submission = await Contact.findById(req.params.id);

  if (!submission) {
    throw ApiError.notFound('Contact submission not found');
  }

  if (!submission.isRead) {
    submission.isRead = true;
    await submission.save({ validateBeforeSave: false });
  }

  ApiResponse.success(res, submission);
});

const markRead = asyncHandler(async (req, res) => {
  const submission = await Contact.findByIdAndUpdate(
    req.params.id,
    { isRead: req.body.isRead },
    { new: true }
  );

  if (!submission) {
    throw ApiError.notFound('Contact submission not found');
  }

  ApiResponse.success(res, submission, 'Submission updated');
});

const remove = asyncHandler(async (req, res) => {
  const submission = await Contact.findByIdAndDelete(req.params.id);

  if (!submission) {
    throw ApiError.notFound('Contact submission not found');
  }

  ApiResponse.success(res, null, 'Submission deleted');
});

module.exports = { submit, getAll, getById, markRead, remove };
