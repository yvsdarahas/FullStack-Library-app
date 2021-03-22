/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose from 'mongoose'
import { UserDocument } from '../models/User'

function createItem(item: UserDocument): Promise<UserDocument> {
  return item.save()
}

function findItemById(
  ItemModel: mongoose.Model<UserDocument>,
  itemId: string
): Promise<UserDocument> {
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
  ItemModel: mongoose.Model<UserDocument>
): Promise<UserDocument[]> {
  return ItemModel.find().exec()
}

function updateItem(
  ItemModel: mongoose.Model<UserDocument>,
  itemId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> {
  return ItemModel.findByIdAndUpdate(itemId, update).exec()
}

function deleteItem(
  ItemModel: mongoose.Model<UserDocument>,
  itemId: string
): Promise<UserDocument | null> {
  return ItemModel.findByIdAndDelete(itemId).exec()
}

export default {
  createItem,
  findItemById,
  findAllItems,
  updateItem,
  deleteItem,
}
