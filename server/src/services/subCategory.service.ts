import { ApiError } from "../errors";
import { SubCategory } from "../models";
import { ISubCategory } from "../types";

class SubCategoryService {
  public async getAll(): Promise<ISubCategory[]> {
    try {
      return SubCategory.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async create(data: ISubCategory): Promise<any> {
    try {
      return SubCategory.create({
        ...data,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const subCategoryService = new SubCategoryService();
