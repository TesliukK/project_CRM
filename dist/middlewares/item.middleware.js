"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemMiddleware = void 0;
const errors_1 = require("../errors");
const models_1 = require("../models");
class ItemMiddleware {
    async getByIdAndThrow(req, res, next) {
        try {
            const { itemId } = req.params;
            const item = await models_1.Items.findById(itemId);
            if (!item) {
                return next(new errors_1.ApiError("Not found", 422));
            }
            res.locals.item = item;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.itemMiddleware = new ItemMiddleware();
