const config = require('./config/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('./config/logger');
const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  checkoutBook,
} = require('./controllers/book.controller');
const errorHandler = require('./middleware/errorHandler');
const validateBook = require('./middleware/validateBook');
const { registerUser, loginUser } = require('./controllers/auth.controller');
const { requireAuth, requireAdmin } = require('./middleware/auth.middleware');
const rateLimit = require('express-rate-limit');

app.use(express.json());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
});

app.use(limiter);

app.post('/books', requireAuth, validateBook, createBook);
app.get('/books', getAllBooks);
app.get('/books/:id', getBookById);
app.put('/books/:id', requireAuth, updateBook);
app.put('/books/:id/checkout', requireAuth, checkoutBook);
app.delete('/books/:id', requireAuth, requireAdmin, deleteBook);
app.post('/auth/register', registerUser);
app.post('/auth/login', loginUser);

app.get('/', (req, res) => {
  res.send('Welcome to LibroTrack API');
});

app.get('/health', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const isDbConnected = dbState === 1;

    res.json({
      status: isDbConnected ? 'healthy' : 'unhealthy',
      database: isDbConnected ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ status: 'unhealthy', error: err.message });
  }
});

mongoose.connect(config.mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(errorHandler);

module.exports = app;