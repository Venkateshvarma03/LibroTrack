const redis = require('redis');
const config = require('./config.js');

const redisClient = redis.createClient({
  socket: {
    host: config.redisHost,
    port: config.redisPort,
    reconnectStrategy: (retries) => {
      if (retries > 3) {
        console.error('Redis: giving up after 3 retries');
        return new Error('Too many retries');
      }
      return Math.min(retries * 100, 3000);
    },
  },
  password: config.redisPassword,
});

redisClient.on('error', (err) => console.error('Redis error:', err.message));

redisClient.connect().catch((err) => console.error('Redis initial connection failed:', err.message));

module.exports = redisClient;