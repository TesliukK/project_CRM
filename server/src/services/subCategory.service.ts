import { Types } from "mongoose";

import { SubCategory } from "../models";

class SubCategoryService {
  public async create(
    categoryId: Types.ObjectId,
    subcategoryName: string
  ): Promise<any> {
    try {
      const subCategory = await SubCategory.create({
        categoryId,
        subcategoryName,
      });
      return subCategory;
    } catch (e) {
      throw new Error("Помилка створення підкатегорії");
    }
  }

  public async getByCategoryId(categoryId: Types.ObjectId): Promise<any> {
    try {
      const subCategories = await SubCategory.find({ categoryId });
      return subCategories;
    } catch (e) {
      throw new Error("Помилка отримання підкатегорій за категорією");
    }
  }
}

export const subCategoryService = new SubCategoryService();
