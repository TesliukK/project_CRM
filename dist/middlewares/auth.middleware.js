"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const enums_1 = require("../enums");
const errors_1 = require("../errors");
const models_1 = require("../models");
const services_1 = require("../services");
class AuthMiddleware {
    async checkAccessToken(req, res, next) {
        try {
            const accessToken = req.get("Authorization");
            if (!accessToken) {
                return next(new errors_1.ApiError("No token", 401));
            }
            const jwtPayload = services_1.tokenService.checkToken(accessToken);
            const tokenInfo = await models_1.Token.findOne({ accessToken });
            if (!tokenInfo) {
                return next(new errors_1.ApiError("Token not valid", 401));
            }
            req.res.locals = { tokenInfo, jwtPayload };
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkRefreshToken(req, res, next) {
        try {
            const refreshToken = req.get("Refresh-Token");
            if (!refreshToken) {
                return next(new errors_1.ApiError("No token", 401));
            }
            const jwtPayload = services_1.tokenService.checkToken(refreshToken, enums_1.ETokenType.refresh);
            const tokenInfo = await models_1.Token.findOne({ refreshToken });
            if (!tokenInfo) {
                return next(new errors_1.ApiError("Token not valid", 401));
            }
            req.res.locals = { tokenInfo, jwtPayload };
            next();
        }
        catch (e) {
            next(e);
        }
    }
    checkActionToken(type) {
        return async (req, res, next) => {
            try {
                const actionToken = req.params.token;
                if (!actionToken) {
                    return next(new errors_1.ApiError("No token", 401));
                }
                const jwtPayload = services_1.tokenService.checkActionToken(actionToken, type);
                const tokenInfo = await models_1.Action.findOne({ actionToken });
                if (!tokenInfo) {
                    return next(new errors_1.ApiError("Token not valid", 401));
                }
                req.res.locals = { tokenInfo, jwtPayload };
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    async checkOldPassword(req, res, next) {
        try {
            const { body } = req;
            const { tokenInfo } = req.res.locals;
            const oldPasswords = await models_1.OldPassword.find({
                _user_id: tokenInfo._user_id,
            });
            if (!oldPasswords)
                return next();
            await Promise.all(oldPasswords.map(async (record) => {
                const isMatched = await services_1.passwordService.compare(body.password, record.password);
                if (isMatched) {
                    throw new errors_1.ApiError("Your new password is the same as your old!", 409);
                }
            }));
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authMiddleware = new AuthMiddleware();
