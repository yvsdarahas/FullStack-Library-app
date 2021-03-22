import { Request, Response, NextFunction } from 'express'

import Library from '../models/Book'
import BookService from '../services/book'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

// POST /books\s
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      author,
      shortDescription,
      genre,
      pages,
      coverPage,
      published,
      rating,
      availability,
    } = req.body

    const book = new Library({
      title,
      author,
      shortDescription,
      genre,
      pages,
      coverPage,
      published,
      rating,
      availability,
    })

    await BookService.createItem(book)
    res.json(book)
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

// PUT /bookss/:bookId
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const bookId = req.params.bookId
    await BookService.updateItem(Library, bookId, update)
    return Library.findById(bookId)
      .exec()
      .then((book) => res.send(book))
  } catch (error) {
    next(new NotFoundError('books not found', error))
  }
}

// DELETE /books\s/:bookId
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await BookService.deleteItem(Library, req.params.bookId)
    res.status(204).end()
  } catch (error) {
    next(new NotFoundError('books not found', error))
  }
}

// GET /books\s/:bookId
export const findBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BookService.findItemById(Library, req.params.bookId))
  } catch (error) {
    next(new NotFoundError('books not found', error))
  }
}

// GET /books\s
export const findAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BookService.findAllItems(Library))
  } catch (error) {
    next(new NotFoundError('bookss not found', error))
  }
}
