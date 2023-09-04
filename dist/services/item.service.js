"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemService = void 0;
const errors_1 = require("../errors");
const models_1 = require("../models");
class ItemService {
    async getWithPagination(query) {
        try {
            const queryStr = JSON.stringify(query);
            const queryObj = JSON.parse(queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`));
            const { page = 1, limit = 10, sortedBy = "createdAt", ...searchObject } = queryObj;
            const skip = limit * (page - 1);
            const items = await models_1.Items.find(searchObject)
                .skip(skip)
                .limit(limit)
                .sort(sortedBy)
                .lean();
            const itemsTotalCount = await models_1.Items.countDocuments(searchObject);
            const totalPages = Math.ceil(itemsTotalCount / limit);
            return {
                page: +page,
                totalPages: totalPages,
                itemsCount: itemsTotalCount,
                itemsFound: items.length,
                perPage: +limit,
                data: items.slice(0, limit),
            };
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async create(data, categoryId, subCategoryId) {
        try {
            const category = await models_1.Category.findById(categoryId);
            if (!category) {
                throw new errors_1.ApiError("Category not found", 404);
            }
            const subCategory = await models_1.SubCategory.findById(subCategoryId);
            if (!subCategory) {
                throw new errors_1.ApiError("subCategory not found", 404);
            }
            return await models_1.Items.create({
                ...data,
                category: category,
                subCategory: subCategory,
            });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async getById(id) {
        try {
            return models_1.Items.findById(id).lean();
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async update(itemId, data) {
        try {
            return await models_1.Items.findByIdAndUpdate(itemId, data, { new: true });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async delete(itemId) {
        try {
            await models_1.Items.deleteOne({ _id: itemId });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
}
exports.itemService = new ItemService();
