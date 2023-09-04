"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryController = void 0;
const services_1 = require("../services");
class SubCategoryController {
    async getAll(req, res, next) {
        try {
            const subCategories = await services_1.subCategoryService.getAll();
            return res.json(subCategories);
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            const { categoryId } = req.body;
            const subCategory = await services_1.subCategoryService.create(req.body, categoryId);
            return res.status(201).json(subCategory);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const { subCategory } = res.locals;
            return res.json(subCategory);
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const { params, body } = req;
            const updatedSubCategory = await services_1.subCategoryService.update(params.subCategoryId, body);
            return res.status(201).json(updatedSubCategory);
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            const { subCategoryId } = req.params;
            await services_1.subCategoryService.delete(subCategoryId);
            return res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.subCategoryController = new SubCategoryController();
