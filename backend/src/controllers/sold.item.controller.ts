import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

import { ApiError } from "../errors";
import { Token, User } from "../models";
import { soldItemService } from "../services";
import { IQuery, ISoldItem } from "../types";

class SoldItemController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ISoldItem[]>> {
    try {
      const soldItem = await soldItemService.getWithPagination(
        req.query as IQuery,
      );

      return res.json(soldItem);
    } catch (e) {
      next(e);
    }
  }
  public async addToSold(req: Request, res: Response): Promise<void> {
    try {
      const { itemId, price, quantity } = req.body;
      const accessToken = req.get("Authorization"); // Отримайте ідентифікатор продавця з системи аутентифікації
      const tokenInfo = await Token.findOne({ accessToken });
      const user = await User.findById(tokenInfo._user_id);
      const soldItem = await soldItemService.addToSold(
        itemId,
        price,
        quantity,
        user,
      );
      res.status(201).json(soldItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteAndReturn(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { itemId, soldId } = req.params;

      await soldItemService.deleteAndReturn(new Types.ObjectId(itemId), soldId);

      res.sendStatus(204);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      } else {
        next(error);
      }
    }
  }
}

export const soldItemController = new SoldItemController();
