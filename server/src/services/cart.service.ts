import { ApiError } from "../errors";
import { Cart } from "../models";
import { ICart, ICartItem } from "../types";

class CartService {
  public async createCartForUser(userId: string): Promise<ICart> {
    try {
      const cart = new Cart({ user: userId, items: [] });
      await cart.save();
      return cart.toObject();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getCartItemsForUser(userId: string): Promise<ICartItem[]> {
    try {
      const cart = await Cart.findOne({ User: userId }).populate(
        "items.productId"
      );
      return cart ? cart.items : [];
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async addToCart(
    userId: string,
    newItem: ICartItem
  ): Promise<ICartItem[]> {
    try {
      const cart = await Cart.findOne({ User: userId });
      console.log(userId);
      if (!cart) {
        throw new ApiError("Користувача з таким ID не знайдено", 404);
      }

      cart.items.push(newItem);
      await cart.save();
      return cart.items;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  // public async removeFromCart(
  //   userId: string,
  //   productId: string
  // ): Promise<ICartItem[]> {
  //   try {
  //     const cart = await Cart.findOne({ user: userId });
  //     if (!cart) {
  //       throw new ApiError("Користувача з таким ID не знайдено", 404);
  //     }
  //
  //     cart.items = cart.items.filter(
  //       (item) => item.productId._id.toString() !== productId
  //     );
  //     await cart.save();
  //     return cart.items;
  //   } catch (e) {
  //     throw new ApiError(e.message, e.status);
  //   }
  // }
}

export const cartService = new CartService();
