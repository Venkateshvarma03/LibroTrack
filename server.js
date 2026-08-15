const app = require('./app');
const config = require('./config/config');
const mongoose = require('mongoose');
const logger = require('./config/logger');

const server = app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});

function gracefulShutdown(signal) {
  logger.info(`${signal} received. Shutting down gracefully...`);

  server.close(async () => {
    logger.info('HTTP server closed.');

    await mongoose.connection.close();
    logger.info('MongoDB connection closed.');

    process.exit(0);
  });
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));