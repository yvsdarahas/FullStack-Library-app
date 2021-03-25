import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import UserService from '../services/user'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

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

    await UserService.createUserService(user)
    res.json(user)
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const userId = req.params.userId
    await UserService.updateUserService(User, userId, update)
    return User.findById(userId)
      .exec()
      .then((user) => res.send(user))
  } catch (error) {
    next(new NotFoundError('user not found', error))
  }
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UserService.deleteUserService(User, req.params.userId)
    res.status(204).end()
  } catch (error) {
    next(new NotFoundError('user not found', error))
  }
}

export const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findUserByIdService(User, req.params.userId))
  } catch (error) {
    next(new NotFoundError('user not found', error))
  }
}

export const findAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findAllUsersService(User))
  } catch (error) {
    next(new NotFoundError('users not found', error))
  }
}
