import { ApiError } from "../errors";
import { Category } from "../models";
import { ICategory } from "../types";

class CategoryService {
  public async getAll(): Promise<ICategory[]> {
    try {
      return Category.find();
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
}

export const categoryService = new CategoryService();
