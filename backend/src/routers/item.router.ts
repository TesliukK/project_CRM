import { Router } from "express";

import { itemController } from "../controllers";
import {
  authMiddleware,
  commonMiddleware,
  itemMiddleware,
  roleMiddleware,
} from "../middlewares";
import { ItemValidator } from "../validators";

const router = Router();

router.get("/",  authMiddleware.checkAccessToken, itemController.getAll, authMiddleware.checkAccessToken);

router.post(
  "/",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkAdminRole,
  commonMiddleware.isBodyValid(ItemValidator.createItem),
  itemController.create
);

router.get(
  "/:itemId",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkAdminRole,
  commonMiddleware.isIdValid("itemId"),
  itemMiddleware.getByIdAndThrow,
  itemController.getById
);

router.put(
  "/:itemId",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkAdminRole,
  commonMiddleware.isIdValid("itemId"),
  commonMiddleware.isBodyValid(ItemValidator.updateItem),
  itemMiddleware.getByIdAndThrow,
  itemController.update
);

router.delete(
  "/:itemId",
  authMiddleware.checkAccessToken,
  roleMiddleware.checkAdminRole,
  commonMiddleware.isIdValid("itemId"),
  itemMiddleware.getByIdAndThrow,
  itemController.delete
);
export const itemRouter = router;
