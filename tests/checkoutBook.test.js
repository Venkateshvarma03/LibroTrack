const Book = require('../models/Book');
const { checkoutBookService } = require('../services/book.service');

jest.mock('../models/Book');

test('throws an error if book is already checked out', async () => {
  Book.findById.mockResolvedValue({
    _id: '123',
    available: false,
  });

  await expect(checkoutBookService('123')).rejects.toThrow('Book is already checked out');
});

test('throws an error if book does not exist', async () => {
  Book.findById.mockResolvedValue(null);

  await expect(checkoutBookService('456')).rejects.toThrow('Book not found');
});