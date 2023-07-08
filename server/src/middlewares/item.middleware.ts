import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { Item } from "../models";

class ItemMiddleware {
  public async getByIdAndThrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { itemId } = req.params;

      const item = await Item.findById(itemId);

      if (!item) {
        return next(new ApiError("Not found", 422));
      }
      res.locals.item = item;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const itemMiddleware = new ItemMiddleware();
