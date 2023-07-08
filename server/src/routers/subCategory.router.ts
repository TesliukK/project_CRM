import { Router } from "express";

import { subCategoryController } from "../controllers/subCategory.controller";

const router = Router();

router.get("/", subCategoryController.getAll);
router.post("/", subCategoryController.create);

export const subCategoryRouter = router;
