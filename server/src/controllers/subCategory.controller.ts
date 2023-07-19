import { NextFunction, Request, Response } from "express";

import { itemService, subCategoryService } from "../services";
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
      const { categoryId } = req.body;
      const subCategory = await subCategoryService.create(req.body, categoryId);

      return res.status(201).json(subCategory);
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ISubCategory>> {
    try {
      const { subCategory } = res.locals;
      return res.json(subCategory);
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ISubCategory>> {
    try {
      const { params, body } = req;

      const updatedSubCategory = await subCategoryService.update(
        params.subCategoryId,
        body
      );

      return res.status(201).json(updatedSubCategory);
    } catch (e) {
      next(e);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { subCategoryId } = req.params;

      await itemService.delete(subCategoryId);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const subCategoryController = new SubCategoryController();
