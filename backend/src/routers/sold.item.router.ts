import { Router } from "express";

import { soldItemController } from "../controllers";
import { authMiddleware } from "../middlewares";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, soldItemController.getAll);
// Додавання товару до проданих
router.post("/", soldItemController.addToSold);
router.delete("/:itemId/:soldId", soldItemController.deleteAndReturn);
export const soldRouter = router;
