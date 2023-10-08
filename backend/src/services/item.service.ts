import { ApiError } from "../errors";
import { Items } from "../models";
import { IItem, IPaginationResponse, IQuery } from "../types";

class ItemService {
  public async getWithPagination(
    query: IQuery,
  ): Promise<IPaginationResponse<IItem>> {
    try {
      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
      );

      const {
        page = 1,
        limit = 10,
        sortedBy = "createdAt",
        ...searchObject
      } = queryObj;

      const skip = limit * (page - 1);

      const items = await Items.find(searchObject)
        .skip(skip)
        .limit(limit)
        .sort(sortedBy)
        .lean();
      const itemsTotalCount = await Items.countDocuments(searchObject);
      const totalPages = Math.ceil(itemsTotalCount / limit);
      return {
        page: +page,
        totalPages: totalPages,
        itemsCount: itemsTotalCount,
        itemsFound: items.length,
        perPage: +limit,
        data: items.slice(0, limit),
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async searchItems(query: IQuery): Promise<IPaginationResponse<IItem>> {
    try {
      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
      );

      const {
        page = 1,
        limit = 10,
        sortedBy = "createdAt",
        search = "", // Додаємо поле для пошуку
        ...searchObject
      } = queryObj;

      const skip = limit * (page - 1);

      // Розділити рядок по пробілах і побудувати масив слів
      const searchWords: string[] = search
        .split(" ")
        .filter((word: string) => word.trim() !== "");

      // Створюємо об'єкт для пошуку
      const searchQuery = {
        ...searchObject,
        $and: searchWords.map((word: string) => ({
          $or: [
            { itemName: { $regex: word, $options: "i" } },
            { brand: { $regex: word, $options: "i" } },
            // Додайте інші поля для пошуку, які вам потрібні
          ],
        })),
      };

      const items = await Items.find(searchQuery)
        .skip(skip)
        .limit(limit)
        .sort(sortedBy)
        .lean();
      const itemsTotalCount = await Items.countDocuments(searchQuery);
      const totalPages = Math.ceil(itemsTotalCount / limit);
      return {
        page: +page,
        totalPages: totalPages,
        itemsCount: itemsTotalCount,
        itemsFound: items.length,
        perPage: +limit,
        data: items.slice(0, limit),
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(data: IItem): Promise<any> {
    try {
      const createAt = new Date().toLocaleString("en-US", {
        timeZone: "Europe/Kiev",
      });
      return await Items.create({
        createAt,
        ...data,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getById(id: string): Promise<IItem> {
    try {
      return Items.findById(id).lean();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async update(itemId: string, data: Partial<IItem>): Promise<void> {
    try {
      return await Items.findByIdAndUpdate(itemId, data, { new: true });
    } catch (e) {
      throw new ApiError(e.message, e.status);
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

export const itemService = new ItemService();
