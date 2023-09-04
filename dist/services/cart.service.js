"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartService = void 0;
const errors_1 = require("../errors");
const models_1 = require("../models");
class CartService {
    async getCartItemsForUser(userId) {
        try {
            const cart = await models_1.Cart.findOne({ user: userId });
            return cart ? cart.items : [];
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async addToCart(userId, newItem) {
        try {
            const cart = await models_1.Cart.findOne({ user: userId });
            if (!cart) {
                throw new errors_1.ApiError("Користувача з таким ID не знайдено", 404);
            }
            cart.items.push(newItem);
            await cart.save();
            return cart.items;
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async removeFromCart(userId) {
        try {
            const cart = await models_1.Cart.findOne({ user: userId });
            if (!cart) {
                throw new errors_1.ApiError("Користувача з таким ID не знайдено", 404);
            }
            const itemIndex = cart.items.findIndex((item) => item.productId.toString);
            console.log(itemIndex);
            return cart.items;
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
}
exports.cartService = new CartService();
