import { Types } from "mongoose";

import { ApiError } from "../errors";
import { Item } from "../models";
import { IItem } from "../types";

class ItemService {
  public async create(data: IItem, userId: string): Promise<any> {
    try {
      return Item.create({ ...data, user: new Types.ObjectId(userId) });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getById(id: string): Promise<IItem> {
    try {
      return Item.findById(id).lean();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async update(itemId: string, data: Partial<IItem>): Promise<void> {
    try {
      return await Item.findByIdAndUpdate(itemId, data, { new: true });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async delete(itemId: string): Promise<void> {
    try {
      await Item.deleteOne({ _id: itemId });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const itemService = new ItemService();
