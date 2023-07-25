import { Router } from "express";

import { cartController } from "../controllers/cart.controller";
import { authMiddleware } from "../middlewares";

const router = Router();

router.get(
  "/",
  authMiddleware.checkAccessToken,
  cartController.getCartItemsForUser
);

router.post("/add", authMiddleware.checkAccessToken, cartController.addToCart);

router.delete(
  "/remove/:productId",
  authMiddleware.checkAccessToken,
  cartController.removeFromCart
);
export const cartRouter = router;
