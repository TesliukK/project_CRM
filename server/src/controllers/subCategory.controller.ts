import { NextFunction, Request, Response } from "express";

import { subCategoryService } from "../services";
import { ICommonResponse, ISubCategory } from "../types";

class SubCategoryController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ISubCategory[]>> {
    try {
      const subCategories = await subCategoryService.getAll();

      return res.json(subCategories);
    } catch (e) {
      next(e);
    }
  }
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<ISubCategory>>> {
    try {
      const type = await subCategoryService.create(req.body);

      return res.status(201).json(type);
    } catch (e) {
      next(e);
    }
  }
}

export const subCategoryController = new SubCategoryController();
