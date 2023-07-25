import { NextFunction, Request, Response } from "express";

import { cartService } from "../services/cart.service";
import { ICartItem } from "../types";

class CartController {
  public async getCartItemsForUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICartItem[]>> {
    try {
      const { tokenInfo } = res.locals;
      const cartItems = await cartService.getCartItemsForUser(
        tokenInfo._user_id
      );
      return res.json(cartItems);
    } catch (e) {
      next(e);
    }
  }

  public async addToCart(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICartItem[]>> {
    try {
      const { tokenInfo } = res.locals;
      const newItem = req.body;
      const cartItems = await cartService.addToCart(
        tokenInfo._user_id,
        newItem
      );
      return res.json(cartItems);
    } catch (e) {
      next(e);
    }
  }

  public async removeFromCart(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICartItem[]>> {
    try {
      const { tokenInfo } = res.locals;
      const { productId } = req.params;

      // Викликаємо метод removeFromCart з сервісу
      const cartItems = await cartService.removeFromCart(
        tokenInfo._user_id,
        productId
      );

      return res.json(cartItems);
    } catch (e) {
      next(e);
    }
  }
}

export const cartController = new CartController();
