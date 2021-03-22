import express from 'express'
import passport from 'passport'
import User from '../models/User'

import { findAndCreateUser, findAndCreateToken } from '../services/auth'

export const authRouter = express.Router()

authRouter.post(
  '/register',
  passport.authenticate('google-id-token', { session: false }),
  async function (req: any, res) {
    const status = await findAndCreateUser(User, req.user.userData)
    res.send(status)
  }
)

authRouter.post(
  '/signIn',
  passport.authenticate('google-id-token', { session: false }),
  async function (req: any, res) {
    const loginCredentials = await findAndCreateToken(User, req.user.userData)
    res.send(loginCredentials)
  }
)
