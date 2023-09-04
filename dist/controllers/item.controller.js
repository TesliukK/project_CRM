"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemController = void 0;
const services_1 = require("../services");
class ItemController {
    async getAll(req, res, next) {
        try {
            const items = await services_1.itemService.getWithPagination(req.query);
            return res.json(items);
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            const { categoryId, subCategoryId } = req.body;
            const item = await services_1.itemService.create(req.body, categoryId, subCategoryId);
            return res.status(201).json(item);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const { item } = res.locals;
            return res.json(item);
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const { params, body } = req;
            const updatedItem = await services_1.itemService.update(params.itemId, body);
            return res.status(201).json(updatedItem);
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            const { itemId } = req.params;
            await services_1.itemService.delete(itemId);
            return res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.itemController = new ItemController();
