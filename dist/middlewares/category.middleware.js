"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeItemMiddleware = void 0;
const errors_1 = require("../errors");
const models_1 = require("../models");
class CategoryMiddleware {
    async getByIdAndThrow(req, res, next) {
        try {
            const { typeId } = req.params;
            const type = await models_1.Category.findById(typeId);
            if (!type) {
                return next(new errors_1.ApiError("Not found", 422));
            }
            res.locals.type = type;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.typeItemMiddleware = new CategoryMiddleware();
