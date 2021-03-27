/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose from 'mongoose'
import { UserDocument } from '../models/User'

function createUserService(item: UserDocument): Promise<UserDocument> {
  return item.save()
}

function findUserByIdService(
  ItemModel: mongoose.Model<UserDocument>,
  itemId: string
): Promise<UserDocument> {
  return ItemModel.findById(itemId)
    .exec()
    .then((book) => {
      if (!book) {
        throw new Error(`User ${itemId} not found`)
      }
      return book
    })
}

function findAllUsersService(
  ItemModel: mongoose.Model<UserDocument>
): Promise<UserDocument[]> {
  return ItemModel.find().exec()
}

function updateUserService(
  ItemModel: mongoose.Model<UserDocument>,
  itemId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> {
  return ItemModel.findByIdAndUpdate(itemId, update).exec()
}

function deleteUserService(
  ItemModel: mongoose.Model<UserDocument>,
  itemId: string
): Promise<UserDocument | null> {
  return ItemModel.findByIdAndDelete(itemId).exec()
}

export default {
  createUserService,
  findUserByIdService,
  findAllUsersService,
  updateUserService,
  deleteUserService,
}
