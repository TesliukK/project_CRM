import express from "express";

import { subCategoryController } from "../controllers";

const router = express.Router();

router.get("/", subCategoryController.getAll);
router.post("/", subCategoryController.create);

export const subCategoryRouter = router;
