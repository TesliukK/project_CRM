import { ApiError } from "../errors";
import { Category } from "../models";
import { ICategory } from "../types";

class CategoryService {
  public async getAll(): Promise<ICategory[]> {
    try {
      return await Category.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async create(data: ICategory): Promise<any> {
    try {
      return Category.create({
        ...data,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async getById(id: string): Promise<ICategory> {
    try {
      return Category.findById(id).lean();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async update(
    categoryId: string,
    data: Partial<ICategory>
  ): Promise<ICategory | null> {
    try {
      return await Category.findByIdAndUpdate(categoryId, data, { new: true });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async delete(categoryId: string): Promise<void> {
    try {
      const result = await Category.deleteOne({ _id: categoryId });
      if (!result.acknowledged) {
        throw new Error("Помилка видалення категорії");
      }
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const categoryService = new CategoryService();
