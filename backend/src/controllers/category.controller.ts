import { NextFunction, Request, Response } from "express";

import { categoryService } from "../services";
import { ICategory, ICommonResponse } from "../types";

class CategoryController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICategory[]>> {
    try {
      const category = await categoryService.getAll();

      return res.json(category);
    } catch (e) {
      next(e);
    }
  }
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<ICategory>>> {
    try {
      const type = await categoryService.create(req.body);

      return res.status(201).json(type);
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICategory>> {
    try {
      const { category } = res.locals;
      return res.json(category);
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICategory>> {
    try {
      const { params, body } = req;

      const updatedCategory = await categoryService.update(
        params.categoryId,
        body
      );

      return res.status(201).json(updatedCategory);
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
      const { categoryId } = req.params;

      await categoryService.delete(categoryId);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const categoryController = new CategoryController();
