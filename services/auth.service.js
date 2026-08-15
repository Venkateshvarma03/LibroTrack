const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');
const emailQueue = require('../queues/email.queue');

async function registerUserService(username, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });

  await emailQueue.add('send-welcome-email', {
    toEmail: user.email,
    username: user.username,
  });

  return user;
}

async function loginUserService(username, password) {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error('Invalid username or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid username or password');
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    config.jwtSecret,
    { expiresIn: '1h' }
  );

  return { user, token };
}

module.exports = { registerUserService, loginUserService };