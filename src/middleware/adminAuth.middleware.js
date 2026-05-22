const { verifyToken, TOKEN_TYPES } = require('../utils/jwt');
const ApiError = require('../utils/ApiError');
const Admin = require('../models/Admin.model');

const authenticateAdmin = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw ApiError.unauthorized('Admin access token is required');
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (decoded.type !== TOKEN_TYPES.ADMIN) {
      throw ApiError.forbidden('Invalid admin token');
    }

    const admin = await Admin.findById(decoded.id);

    if (!admin || !admin.isActive) {
      throw ApiError.unauthorized('Admin not found or inactive');
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(ApiError.unauthorized('Invalid or expired admin token'));
    }
    next(error);
  }
};

module.exports = { authenticateAdmin };
