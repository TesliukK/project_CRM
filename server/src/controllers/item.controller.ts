import { NextFunction, Request, Response } from "express";

import { itemService } from "../services";
import { ICommonResponse, IItem, IQuery } from "../types";

class ItemController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IItem[]>> {
    try {
      const items = await itemService.getWithPagination(req.query as IQuery);

      return res.json(items);
    } catch (e) {
      next(e);
    }
  }
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<IItem>>> {
    try {
      const { categoryId } = req.body;
      const item = await itemService.create(req.body, categoryId);

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
