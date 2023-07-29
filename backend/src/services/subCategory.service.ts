import { ApiError } from "../errors";
import { Category, SubCategory } from "../models";
import { ISubCategory } from "../types";

class SubCategoryService {
  public async getAll(): Promise<ISubCategory[]> {
    try {
      return SubCategory.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async create(data: ISubCategory, categoryId: string): Promise<any> {
    try {
      const category = await Category.findById(categoryId);

      if (!category) {
        throw new ApiError("Category not found", 404);
      }

      return await SubCategory.create({
        ...data,
        category: category,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getById(id: string): Promise<ISubCategory> {
    try {
      return SubCategory.findById(id).lean();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async update(
    subCategoryId: string,
    data: Partial<ISubCategory>
  ): Promise<void> {
    try {
      return await SubCategory.findByIdAndUpdate(subCategoryId, data, {
        new: true,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async delete(subCategoryId: string): Promise<void> {
    try {
      await SubCategory.deleteOne({ _id: subCategoryId });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const subCategoryService = new SubCategoryService();
