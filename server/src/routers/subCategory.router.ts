import express from "express";

import { subCategoryController } from "../controllers";
import { createSubCategoryMiddleware } from "../middlewares";

const router = express.Router();

router.post(
  "/:categoryId/subcategories",
  createSubCategoryMiddleware,
  subCategoryController.createSubCategory
);

export const subCategoryRouter = router;
