import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import lusca from 'lusca'
import passport from 'passport'
import dotenv from 'dotenv'
import cors from 'cors'

import bookRouter from './routers/book'
import { userRouter } from './routers/user'
import { authRouter } from './routers/auth'
import apiErrorHandler from './middlewares/apiErrorHandler'
import googleStrategy from './config/passport'

dotenv.config({ path: '.env' })
const app = express()

app.set('port', process.env.PORT || 5000)

app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))
app.use(cors())
app.use(passport.initialize())

passport.use(googleStrategy.googleAuth)

app.use('/api/v1/books', bookRouter)
app.use('/api/v1/users', userRouter)
app.use('/auth/google', authRouter)

app.use(apiErrorHandler)

export default app
