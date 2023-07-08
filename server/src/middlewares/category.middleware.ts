import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { CategoryOfItem } from "../models";

class CategoryMiddleware {
  public async getByIdAndThrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { typeId } = req.params;

      const type = await CategoryOfItem.findById(typeId);

      if (!type) {
        return next(new ApiError("Not found", 422));
      }
      res.locals.type = type;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const typeItemMiddleware = new CategoryMiddleware();
