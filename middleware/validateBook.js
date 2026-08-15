function validateBook(req, res, next) {
  const { title, author } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title cannot be empty' });
  }

  if (!author || typeof author !== 'string' || author.trim() === '') {
    return res.status(400).json({ error: 'Author cannot be empty' });
  }

  next();
}

module.exports = validateBook;
