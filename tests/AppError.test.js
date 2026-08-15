const AppError = require('../utils/AppError');

test('AppError stores message and statusCode correctly', () => {
  const error = new AppError('Book not found', 404);

  expect(error.message).toBe('Book not found');
  expect(error.statusCode).toBe(404);
});

test('AppError is an instance of Error', () => {
  const error = new AppError('Something broke', 500);

  expect(error instanceof Error).toBe(true);
});