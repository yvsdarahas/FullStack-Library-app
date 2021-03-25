import { Request, Response, NextFunction } from 'express'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'
import User from '../models/User'
import { findAndCreateUser, findAndCreateToken } from '../services/auth'

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status = await findAndCreateUser(User, req.user)
    res.send(status)
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

export const signInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loginCredentials = await findAndCreateToken(User, req.user)
    res.send(loginCredentials)
  } catch (error) {
    next(new NotFoundError('user not found', error))
  }
}
