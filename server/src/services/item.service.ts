import { ApiError } from "../errors";
import { Category, Items } from "../models";
import { IItem, IPaginationResponse, IQuery } from "../types";

class ItemService {
  public async getWithPagination(
    query: IQuery
  ): Promise<IPaginationResponse<IItem>> {
    try {
      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`)
      );

      const {
        page = 1,
        limit = 5,
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
      return {
        page: +page,
        itemsCount: itemsTotalCount,
        itemsFound: items.length,
        perPage: +limit,
        data: items.slice(0, limit),
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async create(data: IItem, categoryId: string): Promise<any> {
    try {
      const category = await Category.findById(categoryId);

      if (!category) {
        throw new ApiError("Category not found", 404);
      }

      return await Items.create({
        ...data,
        category: category,
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
