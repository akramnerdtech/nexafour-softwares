const jwt = require('jsonwebtoken');
const { jwt: jwtConfig } = require('../config/env');

const TOKEN_TYPES = {
  USER: 'user',
  ADMIN: 'admin',
};

const signToken = (payload) => {
  return jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
};

const signUserToken = (user) => {
  return signToken({
    id: user._id,
    role: user.role,
    type: TOKEN_TYPES.USER,
  });
};

const signAdminToken = (admin) => {
  return signToken({
    id: admin._id,
    type: TOKEN_TYPES.ADMIN,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtConfig.secret);
};

module.exports = {
  TOKEN_TYPES,
  signToken,
  signUserToken,
  signAdminToken,
  verifyToken,
};
