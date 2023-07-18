import { Router } from "express";

import { categoryController } from "../controllers";
import { authMiddleware } from "../middlewares";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, categoryController.getAll);

router.post("/", authMiddleware.checkAccessToken, categoryController.create);

// router.get(
//   "/:carId",
//   authMiddleware.checkAccessToken,
//   commonMiddleware.isIdValid("carId"),
//   itemMiddleware.getByIdAndThrow,
//   itemController.getById
// );
//
// router.put(
//   "/:carId",
//   authMiddleware.checkAccessToken,
//   commonMiddleware.isIdValid("carId"),
//   commonMiddleware.isBodyValid(CarValidator.updateCar),
//   carMiddleware.getByIdAndThrow,
//   carController.update
// );
//
// router.delete(
//   "/:carId",
//   authMiddleware.checkAccessToken,
//   commonMiddleware.isIdValid("carId"),
//   carMiddleware.getByIdAndThrow,
//   carController.delete
// );
export const categoryRouter = router;
