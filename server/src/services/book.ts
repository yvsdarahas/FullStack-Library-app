/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose from 'mongoose'
import { BookDocument } from '../models/Book'

function createItem(item: BookDocument): Promise<BookDocument> {
  return item.save()
}

function findItemById(
  ItemModel: mongoose.Model<BookDocument>,
  itemId: string
): Promise<BookDocument> {
  return ItemModel.findById(itemId)
    .exec()
    .then((book) => {
      if (!book) {
        throw new Error(`Book ${itemId} not found`)
      }
      return book
    })
}

function findAllItems(
  ItemModel: mongoose.Model<BookDocument>
): Promise<BookDocument[]> {
  return ItemModel.find().exec()
}

function updateItem(
  ItemModel: mongoose.Model<BookDocument>,
  itemId: string,
  update: Partial<BookDocument>
): Promise<BookDocument | null> {
  return ItemModel.findByIdAndUpdate(itemId, update).exec()
}

function deleteItem(
  ItemModel: mongoose.Model<BookDocument>,
  itemId: string
): Promise<BookDocument | null> {
  return ItemModel.findByIdAndDelete(itemId).exec()
}

export default {
  createItem,
  findItemById,
  findAllItems,
  updateItem,
  deleteItem,
}
