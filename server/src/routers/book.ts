import express from 'express'

import {
  createBook,
  findBookById,
  deleteBook,
  findAllBooks,
  updateBook,
} from '../controllers/book'

const bookrouter = express.Router()

// Every path we define here will get /api/v1/movies prefix
bookrouter.get('/', findAllBooks)
bookrouter.get('/:bookId', findBookById)
bookrouter.patch('/:bookId', updateBook)
bookrouter.delete('/:bookId', deleteBook)
bookrouter.post('/', createBook)

export default bookrouter
