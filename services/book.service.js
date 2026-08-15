const Book = require("../models/Book");

async function createBookService(bookData) {
      if(bookData.isbn){
        const existing = await Book.findOne({isbn:bookData.isbn});
        if(existing){
          return existing;
        }
      }
      return await Book.create(bookData);
}

async function getAllBooksService(page, limit) {
  return await Book.find()
    .skip((page - 1) * limit)
    .limit(limit);
}

async function getBookByIdService(id) {
  return await Book.findById(id);
}

async function updateBookService(id, updates) {
 return await Book.findByIdAndUpdate(id, updates, { new: true });
}

async function deleteBookService(id) {
   return await Book.findByIdAndDelete(id);
}

async function checkoutBookService(id) {
  const book = await Book.findById(id);

  if (!book) {
    throw new Error('Book not found');
  }

  if (!book.available) {
    throw new Error('Book is already checked out');
  }

  book.available = false;
  return await book.save();
}


module.exports = { createBookService,getAllBooksService,getBookByIdService,updateBookService,deleteBookService,checkoutBookService};