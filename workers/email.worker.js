const { Worker } = require('bullmq');
const config = require('../config/config');
const { sendWelcomeEmail } = require('../services/email.service');

const connection = {
  host: config.redisHost,
  port: config.redisPort,
  password: config.redisPassword,
};

const emailWorker = new Worker('email-queue', async (job) => {
  const { toEmail, username } = job.data;
  await sendWelcomeEmail(toEmail, username);
}, { connection });

emailWorker.on('completed', (job) => {
  console.log(`Email job ${job.id} completed`);
});

emailWorker.on('failed', (job, err) => {
  console.error(`Email job ${job.id} failed:`, err.message);
});

module.exports = emailWorker;