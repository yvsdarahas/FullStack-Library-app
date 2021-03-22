import passport from 'passport'
import googleStrategy from 'passport-google-id-token'

import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const googleAuth = new googleStrategy(
  {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
  },
  async function (parsedToken: any, googleId: any, done: any) {
    await done(null, { userData: parsedToken.payload })
  }
)

export default { googleAuth }
