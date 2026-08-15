const logger = require('../config/logger');

function errorHandler(err, req, res, next) {
  logger.error(`${err.message} - ${req.method} ${req.url}`);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ error: err.message });
}

module.exports = errorHandler;