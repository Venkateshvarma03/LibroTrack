require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  redisPassword: process.env.REDIS_PASSWORD,
  resendApiKey: process.env.RESEND_API_KEY,
};

const requiredKeys = ['mongoUri', 'jwtSecret'];

for (const key of requiredKeys) {
  if (!config[key]) {
    throw new Error(`Missing required config: ${key}`);
  }
}

module.exports = config;