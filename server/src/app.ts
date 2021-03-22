import express from 'express'
import compression from 'compression'
import session from 'express-session'
import bodyParser from 'body-parser'
import lusca from 'lusca'
import flash from 'express-flash'
import path from 'path'
import mongoose from 'mongoose'
import passport from 'passport'
import dotenv from 'dotenv'
import cors from 'cors'

// import movieRouter from './routers/movie'
import bookRouter from './routers/book'
import { userRouter } from './routers/user'
import { authRouter } from './routers/auth'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import googleStrategy from './config/passport'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 5000)

// Use common 3rd-party middlewares
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))
app.use(cors())
app.use(passport.initialize())

passport.use(googleStrategy.googleAuth)

// Use movie router
app.use('/api/v1/books', bookRouter)
app.use('/api/v1/users', userRouter)
app.use('/auth/google', authRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
