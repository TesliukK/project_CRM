"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryService = void 0;
const errors_1 = require("../errors");
const models_1 = require("../models");
class SubCategoryService {
    async getAll() {
        try {
            return models_1.SubCategory.find();
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async create(data, categoryId) {
        try {
            const category = await models_1.Category.findById(categoryId);
            if (!category) {
                throw new errors_1.ApiError("Category not found", 404);
            }
            return await models_1.SubCategory.create({
                ...data,
                category: category,
            });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async getById(id) {
        try {
            return models_1.SubCategory.findById(id).lean();
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async update(subCategoryId, data) {
        try {
            return await models_1.SubCategory.findByIdAndUpdate(subCategoryId, data, {
                new: true,
            });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async delete(subCategoryId) {
        try {
            await models_1.SubCategory.deleteOne({ _id: subCategoryId });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
}
exports.subCategoryService = new SubCategoryService();
