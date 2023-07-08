import { NextFunction, Request, Response } from "express";

import { typeItemService } from "../services";
import {
  ICategoryOfItemSchema,
  ICommonResponse,
  ITokenPayload,
} from "../types";

class TypeOfItemController {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<ICategoryOfItemSchema>>> {
    try {
      const { _id } = req.res.locals.jwtPayload as ITokenPayload;
      const type = await typeItemService.create(req.body, _id);

      return res.status(201).json(type);
    } catch (e) {
      next(e);
    }
  }
}

export const typeOfItemController = new TypeOfItemController();
