import { ApiError } from "../errors";
import { Cart } from "../models";
import { ICartItem } from "../types";

class CartService {
  public async getCartItemsForUser(userId: string): Promise<ICartItem[]> {
    try {
      const cart = await Cart.findOne({ user: userId });
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
      const cart = await Cart.findOne({ user: userId });

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

  public async removeFromCart(
    userId: string,
    // productId: string
  ): Promise<ICartItem[]> {
    try {
      const cart = await Cart.findOne({ user: userId });

      if (!cart) {
        throw new ApiError("Користувача з таким ID не знайдено", 404);
      }

      const itemIndex = cart.items.findIndex((item) => item.productId.toString);
      console.log(itemIndex);
      // if (itemIndex !== -1) {
      //   // Знайдено елемент, ви можете його видалити
      //   cart.items.splice(itemIndex, 1);
      //   await cart.save();
      // } else {
      //   // Елемент не знайдено, можна обробити цей випадок, як вам зручно
      //   // Наприклад, повернути помилку або повідомлення, що товар не знайдено.
      // }

      return cart.items;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const cartService = new CartService();
