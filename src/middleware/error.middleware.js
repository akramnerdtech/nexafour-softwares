const ApiError = require('../utils/ApiError');
const { isProduction } = require('../config/env');

const notFound = (req, _res, next) => {
  next(ApiError.notFound(`Route ${req.originalUrl} not found`));
};

const errorHandler = (err, _req, res, _next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';
  let errors = err.errors || [];

  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid resource ID';
  }

  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  }

  if (err.name === 'ValidationError' && err.errors) {
    statusCode = 400;
    message = 'Validation failed';
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  const response = {
    success: false,
    message,
    ...(errors.length > 0 && { errors }),
    ...(!isProduction && { stack: err.stack }),
  };

  if (statusCode === 500 && isProduction) {
    console.error('[ERROR]', err);
    response.message = 'Internal server error';
  } else if (statusCode === 500) {
    console.error('[ERROR]', err);
  }

  res.status(statusCode).json(response);
};

module.exports = { notFound, errorHandler };
