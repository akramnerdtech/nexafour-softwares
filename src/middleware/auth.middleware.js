const { verifyToken, TOKEN_TYPES } = require('../utils/jwt');
const ApiError = require('../utils/ApiError');
const User = require('../models/User.model');

const authenticate = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw ApiError.unauthorized('Access token is required');
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (decoded.type === TOKEN_TYPES.ADMIN) {
      throw ApiError.forbidden('User token required');
    }

    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      throw ApiError.unauthorized('User not found or inactive');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(ApiError.unauthorized('Invalid or expired token'));
    }
    next(error);
  }
};

module.exports = { authenticate };
