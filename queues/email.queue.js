const { Queue } = require('bullmq');
const config = require('../config/config');

const connection = {
  host: config.redisHost,
  port: config.redisPort,
  password: config.redisPassword,
};

const emailQueue = new Queue('email-queue', { connection });

module.exports = emailQueue;