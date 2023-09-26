import { Types } from "mongoose";

import { ApiError } from "../errors";
import { Items, SoldItem } from "../models";
import { IPaginationResponse, IQuery, ISoldItem } from "../types";

class SoldItemService {
  public async getWithPagination(
    query: IQuery,
  ): Promise<IPaginationResponse<ISoldItem>> {
    try {
      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
      );

      const {
        page = 1,
        limit = 10,
        sortedBy = "soldAt",
        ...searchObject
      } = queryObj;

      const skip = limit * (page - 1);

      const soldItems = await SoldItem.find(searchObject)
        .skip(skip)
        .limit(limit)
        .sort(sortedBy)
        .lean();
      const soldItemsTotalCount = await SoldItem.countDocuments(searchObject);
      const totalPages = Math.ceil(soldItemsTotalCount / limit);
      return {
        page: +page,
        totalPages: totalPages,
        itemsCount: soldItemsTotalCount,
        itemsFound: soldItems.length,
        perPage: +limit,
        data: soldItems.slice(0, limit),
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async addToSold(
    itemId: Types.ObjectId,
    price: number,
    quantity: number,
    currentUser: any,
  ): Promise<ISoldItem> {
    try {
      const existingItem = await Items.findById(itemId);
      if (!existingItem) {
        throw new Error("Товар не знайдено");
      }

      const sellerId = currentUser._id;
      const soldAt = new Date().toLocaleString("en-US", {
        timeZone: "Europe/Kiev",
      });
      const soldItem = new SoldItem({
        item: existingItem,
        sellerId,
        price,
        quantity,
        soldAt,
      });

      existingItem.count -= quantity;

      if (existingItem.count <= 0) {
        await existingItem.deleteOne();
      } else {
        await existingItem.save();
      }

      return await soldItem.save();
    } catch (error) {
      throw error;
    }
  }

  public async deleteAndReturn(
    itemId: Types.ObjectId,
    soldId: string,
  ): Promise<void> {
    try {
      const soldItem = await SoldItem.findById(soldId);

      if (!soldItem) {
        throw new ApiError("Проданий товар не знайдено", 404);
      }

      const existingItem = await Items.findById(itemId);

      if (!existingItem) {
        throw new ApiError("Товар у наявності не знайдено", 404);
      }

      existingItem.count += soldItem.quantity;

      await Promise.all([
        existingItem.save(),
        SoldItem.deleteOne({ _id: soldId }),
      ]);
    } catch (error) {
      throw error;
    }
  }

  public async delete(itemId: string): Promise<void> {
    try {
      await Items.deleteOne({ _id: itemId });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const soldItemService = new SoldItemService();
