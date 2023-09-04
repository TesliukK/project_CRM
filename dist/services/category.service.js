"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
const errors_1 = require("../errors");
const models_1 = require("../models");
class CategoryService {
    async getAll() {
        try {
            return await models_1.Category.find();
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async create(data) {
        try {
            return models_1.Category.create({
                ...data,
            });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async getById(id) {
        try {
            return models_1.Category.findById(id).lean();
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async update(categoryId, data) {
        try {
            return await models_1.Category.findByIdAndUpdate(categoryId, data, { new: true });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async delete(categoryId) {
        try {
            const result = await models_1.Category.deleteOne({ _id: categoryId });
            if (!result.acknowledged) {
                throw new Error("Помилка видалення категорії");
            }
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
}
exports.categoryService = new CategoryService();
