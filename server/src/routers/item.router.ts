import { Router } from "express";

import { itemController } from "../controllers/item.controller";
import {
  authMiddleware,
  commonMiddleware,
  itemMiddleware,
} from "../middlewares";
import { ItemValidator } from "../validators/item.validator";

const router = Router();

router.get("/", itemController.getAll);

router.post(
  "/",
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(ItemValidator.createItem),
  itemController.create
);

router.get(
  "/:itemId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("itemId"),
  itemMiddleware.getByIdAndThrow,
  itemController.getById
);

router.put(
  "/:itemId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("itemId"),
  commonMiddleware.isBodyValid(ItemValidator.updateItem),
  itemMiddleware.getByIdAndThrow,
  itemController.update
);

router.delete(
  "/:itemId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("itemId"),
  itemMiddleware.getByIdAndThrow,
  itemController.delete
);
export const itemRouter = router;
