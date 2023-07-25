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
    productId: string
  ): Promise<ICartItem[]> {
    try {
      const cart = await Cart.findOne({ user: userId });

      if (!cart) {
        throw new ApiError("Користувача з таким ID не знайдено", 404);
      }

      // Знаходимо індекс продукту з productId у масиві items
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
      console.log(itemIndex);

      if (itemIndex !== -1) {
        // Видаляємо продукт з масиву items за допомогою методу splice()
        cart.items.splice(itemIndex, 1);
      } else {
        throw new ApiError("Продукт не знайдено у корзині", 404);
      }

      await cart.save();
      return cart.items;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const cartService = new CartService();
