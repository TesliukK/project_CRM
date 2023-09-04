"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const services_1 = require("../services");
class CategoryController {
    async getAll(req, res, next) {
        try {
            const category = await services_1.categoryService.getAll();
            return res.json(category);
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            const type = await services_1.categoryService.create(req.body);
            return res.status(201).json(type);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const { category } = res.locals;
            return res.json(category);
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const { params, body } = req;
            const updatedCategory = await services_1.categoryService.update(params.categoryId, body);
            return res.status(201).json(updatedCategory);
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            const { categoryId } = req.params;
            await services_1.categoryService.delete(categoryId);
            return res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.categoryController = new CategoryController();
