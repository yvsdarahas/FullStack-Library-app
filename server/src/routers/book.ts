import express from 'express'
import { verifyToken } from '../middlewares/verifyToken'
import {
  createBook,
  findBookById,
  deleteBook,
  findAllBooks,
  updateBook,
} from '../controllers/book'

const bookrouter = express.Router()

// Every path we define here will get /api/v1/books prefix
bookrouter.get('/', findAllBooks)
bookrouter.get('/:bookId', findBookById)
bookrouter.patch('/:bookId', verifyToken, updateBook)
bookrouter.delete('/:bookId', verifyToken, deleteBook)
bookrouter.post('/', verifyToken, createBook)

export default bookrouter
