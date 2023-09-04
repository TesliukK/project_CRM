"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartController = void 0;
const cart_service_1 = require("../services/cart.service");
class CartController {
    async getCartItemsForUser(req, res, next) {
        try {
            const { tokenInfo } = res.locals;
            const cartItems = await cart_service_1.cartService.getCartItemsForUser(tokenInfo._user_id);
            return res.json(cartItems);
        }
        catch (e) {
            next(e);
        }
    }
    async addToCart(req, res, next) {
        try {
            const { tokenInfo } = res.locals;
            const newItem = req.body;
            const cartItems = await cart_service_1.cartService.addToCart(tokenInfo._user_id, newItem);
            return res.json(cartItems);
        }
        catch (e) {
            next(e);
        }
    }
    async removeFromCart(req, res, next) {
        try {
            const { tokenInfo } = res.locals;
            const cartItems = await cart_service_1.cartService.removeFromCart(tokenInfo._user_id);
            return res.json(cartItems);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.cartController = new CartController();
