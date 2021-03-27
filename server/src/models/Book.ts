/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type BookDocument = Document & {
  title: string
  author: string
  coverPage: string
  shortDescription: string
  published: number
  pages: number
  genre: string
  rating: number
  availability: boolean
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  coverPage: {
    type: String,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  published: {
    type: Number,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  availability: {
    type: Boolean,
    default: true,
  },
})

const Library = mongoose.model<BookDocument>('Library', bookSchema)

export default Library
