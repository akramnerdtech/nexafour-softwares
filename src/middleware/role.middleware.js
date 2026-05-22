const ApiError = require('../utils/ApiError');
const { ROLES } = require('../models/User.model');

const authorize = (...roles) => {
  return (req, _res, next) => {
    if (!req.user) {
      return next(ApiError.unauthorized());
    }

    if (!roles.includes(req.user.role)) {
      return next(ApiError.forbidden('You do not have permission to perform this action'));
    }

    next();
  };
};

const isAdmin = authorize(ROLES.ADMIN);

module.exports = { authorize, isAdmin };
