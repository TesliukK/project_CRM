"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const express_1 = require("express");
const cart_controller_1 = require("../controllers/cart.controller");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get("/", middlewares_1.authMiddleware.checkAccessToken, cart_controller_1.cartController.getCartItemsForUser);
router.post("/add", middlewares_1.authMiddleware.checkAccessToken, cart_controller_1.cartController.addToCart);
router.delete("/remove/:productId", middlewares_1.authMiddleware.checkAccessToken, cart_controller_1.cartController.removeFromCart);
exports.cartRouter = router;