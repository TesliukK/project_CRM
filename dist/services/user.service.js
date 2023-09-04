"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const errors_1 = require("../errors");
const models_1 = require("../models");
class UserService {
    async getWithPagination(query) {
        try {
            const queryStr = JSON.stringify(query);
            const queryObj = JSON.parse(queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`));
            const { page = 1, limit = 5, sortedBy = "createdAt", ...searchObject } = queryObj;
            const skip = limit * (page - 1);
            const users = await models_1.User.find(searchObject)
                .skip(skip)
                .limit(limit)
                .sort(sortedBy)
                .lean();
            const usersTotalCount = await models_1.User.countDocuments(searchObject);
            const totalPages = Math.ceil(usersTotalCount / limit);
            return {
                page: +page,
                totalPages: totalPages,
                itemsCount: usersTotalCount,
                itemsFound: users.length,
                perPage: +limit,
                data: users.slice(0, limit),
            };
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async getById(id) {
        try {
            return models_1.User.findById(id).lean();
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async update(userId, data) {
        try {
            return await models_1.User.findByIdAndUpdate(userId, data, { new: true });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async delete(userId) {
        try {
            await models_1.User.findById(userId).deleteOne({ _id: userId });
            await models_1.Cart.deleteOne({ user: userId });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
}
exports.userService = new UserService();
