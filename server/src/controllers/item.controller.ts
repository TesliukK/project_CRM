import { NextFunction, Request, Response } from "express";

import { itemService } from "../services";
import { ICommonResponse, IItem, ITokenPayload } from "../types";

class ItemController {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<IItem>>> {
    try {
      const { _id } = req.res.locals.jwtPayload as ITokenPayload;
      const item = await itemService.create(req.body, _id);

      return res.status(201).json(item);
    } catch (e) {
      next(e);
    }
  }
  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IItem>> {
    try {
      const { item } = res.locals;
      return res.json(item);
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IItem>> {
    try {
      const { params, body } = req;

      const updatedItem = await itemService.update(params.itemId, body);

      return res.status(201).json(updatedItem);
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
      const { itemId } = req.params;

      await itemService.delete(itemId);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const itemController = new ItemController();
