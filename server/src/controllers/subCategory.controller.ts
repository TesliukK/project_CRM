import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { subCategoryService } from "../services";

class SubCategoryController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { categoryId, subcategoryName } = req.body;
      const subcategory = await subCategoryService.create(
        Types.ObjectId(categoryId),
        subcategoryName
      );
      return res.status(201).json(subcategory);
    } catch (e) {
      next(e);
    }
  }

  public async getByCategoryId(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { categoryId } = req.params;
      const subcategories = await subCategoryService.getByCategoryId(
        Types.ObjectId(categoryId)
      );
      return res.json(subcategories);
    } catch (e) {
      next(e);
    }
  }
}

export const subCategoryController = new SubCategoryController();
