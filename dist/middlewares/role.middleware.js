"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const enums_1 = require("../enums");
const errors_1 = require("../errors");
const models_1 = require("../models");
class RoleMiddleware {
    async checkAdminRole(req, res, next) {
        try {
            const accessToken = req.get("Authorization");
            if (!accessToken) {
                return next(new errors_1.ApiError("No token", 401));
            }
            const tokenInfo = await models_1.Token.findOne({ accessToken });
            if (!tokenInfo) {
                return next(new errors_1.ApiError("Token not valid", 401));
            }
            const user = await models_1.User.findById(tokenInfo._user_id);
            if (!user) {
                return next(new errors_1.ApiError("User not found", 404));
            }
            if (user.role !== enums_1.EUserRole.admin) {
                return next(new errors_1.ApiError("Недостатньо прав для створення товару.", 403));
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.roleMiddleware = new RoleMiddleware();
