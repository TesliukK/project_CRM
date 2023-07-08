import { NextFunction, Request, Response } from "express";

import { categoryService } from "../services";
import { ICategory, ICommonResponse } from "../types";

class TypeOfItemController {
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
}

export const typeOfItemController = new TypeOfItemController();
