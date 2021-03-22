import express from 'express'

import { verifyToken } from '../middlewares/verifyToken'
import {
  createUser,
  findUserById,
  deleteUser,
  findAllUsers,
  updateUser,
} from '../controllers/user'

export const userRouter = express.Router()

userRouter.get('/', findAllUsers)
userRouter.get('/:userId', findUserById)
userRouter.patch('/:userId', verifyToken, updateUser)
userRouter.delete('/:userId', deleteUser)
userRouter.post('/', createUser)
