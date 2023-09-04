"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const errors_1 = require("../errors");
const models_1 = require("../models");
class UserMiddleware {
    async getByIdAndThrow(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await models_1.User.findById(userId);
            if (!user) {
                throw new errors_1.ApiError("User not found", 422);
            }
            res.locals.user = user;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    getDynamicallyAndThrow(fieldName, from = "body", dbField = "email") {
        return async (req, res, next) => {
            try {
                const fieldValue = req[from][fieldName];
                const user = await models_1.User.findOne({ [dbField]: fieldValue });
                if (user) {
                    return next(new errors_1.ApiError(`User with email ${fieldName} ${fieldValue} already exist`, 409));
                }
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    getDynamicallyOrThrow(fieldName, from = "body", dbField = "email") {
        return async (req, res, next) => {
            try {
                const fieldValue = req[from][fieldName];
                const user = await models_1.User.findOne({ [dbField]: fieldValue });
                if (!user) {
                    return next(new errors_1.ApiError(`User not found`, 422));
                }
                req.res.locals = { user };
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
}
exports.userMiddleware = new UserMiddleware();
