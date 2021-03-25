/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose from 'mongoose'
import { UserDocument } from '../models/User'
import jwt from 'jsonwebtoken'

export async function findAndCreateUser(
  User: mongoose.Model<UserDocument>,
  signedUser: any
) {
  const { given_name, family_name, email, picture } = signedUser.userData

  const userVerify = await User.findOne({ email }).exec()

  const user = new User({
    firstName: given_name,
    lastName: family_name,
    email,
    picture,
    password: '',
    isAdmin: email === 'yvsdarahas@gmail.com' ? true : false,
    books: [],
  })

  if (!userVerify) {
    user.save()
    return { status: 'User successfully registered', success: true }
  } else {
    return { status: 'User already exists', success: false }
  }
}

export async function findAndCreateToken(
  User: mongoose.Model<UserDocument>,
  signedUser: any
) {
  const { email } = signedUser.userData

  const userVerify = await User.findOne({ email }).exec()

  if (userVerify) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET as string)
    return { token, userVerify }
  }
  return { token: '', userVerify }
}
