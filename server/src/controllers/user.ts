import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import UserService from '../services/user'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

// POST /books\s
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password, books } = req.body

    const user = new User({
      firstName,
      lastName,
      email,
      password,
      books,
    })

    await UserService.createItem(user)
    res.json(user)
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

// PUT /bookss/:bookId
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const userId = req.params.userId
    await UserService.updateItem(User, userId, update)
    return User.findById(userId)
      .exec()
      .then((user) => res.send(user))
  } catch (error) {
    next(new NotFoundError('books not found', error))
  }
}

// DELETE /books\s/:bookId
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UserService.deleteItem(User, req.params.userId)
    res.status(204).end()
  } catch (error) {
    next(new NotFoundError('books not found', error))
  }
}

// GET /books\s/:bookId
export const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findItemById(User, req.params.userId))
  } catch (error) {
    next(new NotFoundError('books not found', error))
  }
}

// GET /books\s
export const findAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findAllItems(User))
  } catch (error) {
    next(new NotFoundError('bookss not found', error))
  }
}
