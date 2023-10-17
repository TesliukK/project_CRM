import { NextFunction, Request, Response } from "express";

import { itemService } from "../services";
import { ICommonResponse, IItem } from "../types";

class ItemController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IItem[]>> {
    try {
      const { query } = req;
      const searchText = query.search as string; // Отримуємо текстовий запит для пошуку

      // Викликаємо метод служби для отримання списку предметів з урахуванням пошуку
      const items = await itemService.getAllAndSearch({
        page: query.page as string,
        limit: query.limit as string,
        sortedBy: query.sortedBy as string,
        search: searchText,
      });

      return res.json(items);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICommonResponse<IItem>>> {
    try {
      const item = await itemService.create(req.body);
      return res.status(201).json(item);
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction,
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
    next: NextFunction,
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
    next: NextFunction,
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
