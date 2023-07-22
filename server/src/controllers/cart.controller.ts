import { NextFunction, Request, Response } from "express";

import { cartService } from "../services/cart.service";
import { ICart, ICartItem } from "../types";

class CartController {
  public async createCartForUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICart>> {
    try {
      const { user } = res.locals;
      const cart = await cartService.createCartForUser(user._id);
      return res.json(cart);
    } catch (e) {
      next(e);
    }
  }

  public async getCartItemsForUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICartItem[]>> {
    try {
      const { user } = res.locals;
      const cartItems = await cartService.getCartItemsForUser(user._id);
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
      const { user } = res.locals;
      const newItem: ICartItem = req.body;
      const cartItems = await cartService.addToCart(user._id, newItem);
      return res.json(cartItems);
    } catch (e) {
      next(e);
    }
  }

  // public async removeFromCart(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<Response<ICartItem[]>> {
  //   try {
  //     const user = req.user;
  //     const productId = req.params.productId;
  //     const cartItems = await cartService.removeFromCart(user._id, productId);
  //     return res.json(cartItems);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}

export const cartController = new CartController();
