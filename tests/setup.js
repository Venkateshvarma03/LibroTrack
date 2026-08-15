const mongoose = require('mongoose');

beforeAll(async () => {
  while (mongoose.connection.readyState !== 1) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});