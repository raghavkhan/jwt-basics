const jwt = require('jsonwebtoken');
// const CustomAPIError = require('../errors/custom-error');
const { Unauthenticated } = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // throw new CustomAPIError('No token provided', 401);
    throw new Unauthenticated('No token provided');
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    // throw new CustomAPIError('Not authorized to access this route', 401);
    throw new Unauthenticated('Not authorized to access this route');
  }
};

module.exports = authenticationMiddleware;
