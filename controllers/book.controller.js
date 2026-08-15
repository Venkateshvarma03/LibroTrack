const {
  createBookService,
  getAllBooksService,
  getBookByIdService,
  updateBookService,
  deleteBookService,
  checkoutBookService,
} = require('../services/book.service');

const redisClient = require('../config/redis');
const AppError = require('../utils/AppError');

async function getAllBooks(req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const cacheKey = `books:page${page}:limit${limit}`;

    const cachedBooks = await redisClient.get(cacheKey);

    if (cachedBooks) {
      console.log('Cache hit');
      return res.json(JSON.parse(cachedBooks));
    }

    console.log('Cache miss');
    const books = await getAllBooksService(page, limit);

    await redisClient.set(cacheKey, JSON.stringify(books), { EX: 30 });

    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createBook(req, res, next) {
  try {
    const book = await createBookService(req.body);
    res.status(201).json(book);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
}

async function getBookById(req, res, next) {
  try {
    const { id } = req.params;
    const book = await getBookByIdService(id);

    if (!book) {
      throw new AppError('Book not found', 404);
    }

    res.json(book);
  } catch (err) {
    next(err);
  }
}

async function updateBook(req, res, next) {
  try {
    const { id } = req.params;
    const book = await updateBookService(id, req.body);

    if (!book) {
      throw new AppError('Book not found', 404);
    }

    res.json(book);
  } catch (err) {
    next(err);
  }
}

async function deleteBook(req, res, next) {
  try {
    const { id } = req.params;
    const book = await deleteBookService(id);

    if (!book) {
      throw new AppError('Book not found', 404);
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    next(err);
  }
}

async function checkoutBook(req, res, next) {
  try {
    const { id } = req.params;
    const book = await checkoutBookService(id);
    res.json(book);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
}

module.exports = { createBook, getAllBooks, getBookById, updateBook, deleteBook, checkoutBook };