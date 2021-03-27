/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'
import { BookDocument } from './Book'

export type UserDocument = Document & {
  firstName: string
  lastName: string
  email: string
  password: string
  isAdmin: boolean
  picture: string
  books: BookDocument[]
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  picture: {
    type: String,
  },
  books: {
    type: [Object],
  },
})

const User = mongoose.model<UserDocument>('User', userSchema)

export default User
