import express from 'express'
import passport from 'passport'

import { registerUser, signInUser } from '../controllers/auth'

export const authRouter = express.Router()

authRouter.post(
  '/register',
  passport.authenticate('google-id-token', { session: false }),
  registerUser
)
authRouter.post(
  '/signIn',
  passport.authenticate('google-id-token', { session: false }),
  signInUser
)
