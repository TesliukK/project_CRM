"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const enums_1 = require("../enums");
const errors_1 = require("../errors");
const models_1 = require("../models");
const email_service_1 = require("./email.service");
const password_service_1 = require("./password.service");
const token_service_1 = require("./token.service");
class AuthService {
    async register(body) {
        try {
            const { password } = body;
            const hashedPassword = await password_service_1.passwordService.hash(password);
            await models_1.User.create({
                ...body,
                password: hashedPassword,
            });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async login(credentials, user) {
        try {
            const isMatched = await password_service_1.passwordService.compare(credentials.password, user.password);
            if (!isMatched) {
                throw new errors_1.ApiError("Invalid email or password", 409);
            }
            const tokenPair = token_service_1.tokenService.generateTokenPair({
                _id: user._id,
                firstName: user.firstName,
            });
            await models_1.Token.create({
                _user_id: user._id,
                ...tokenPair,
            });
            return tokenPair;
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async refresh(tokenInfo, jwtPayload) {
        try {
            const tokenPair = token_service_1.tokenService.generateTokenPair({
                _id: jwtPayload._id,
                firstName: jwtPayload.firstName,
            });
            await Promise.all([
                models_1.Token.create({ _user_id: jwtPayload._id, ...tokenPair }),
                models_1.Token.deleteOne({ refreshToken: tokenInfo.refreshToken }),
            ]);
            return tokenPair;
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async changePassword(userId, oldPassword, newPassword) {
        try {
            const user = await models_1.User.findById(userId);
            const isMatched = await password_service_1.passwordService.compare(oldPassword, user.password);
            if (!isMatched) {
                throw new errors_1.ApiError("Wrong old password", 400);
            }
            const hashedNewPassword = await password_service_1.passwordService.hash(newPassword);
            await models_1.User.updateOne({ _id: user._id }, { password: hashedNewPassword });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async forgotPassword(user) {
        try {
            const actionToken = token_service_1.tokenService.generateActionToken({ _id: user._id }, enums_1.EActionTokenType.forgot);
            await models_1.Action.create({
                actionToken,
                tokenType: enums_1.EActionTokenType.forgot,
                _user_id: user._id,
            });
            await email_service_1.emailService.sendMail(user.email, enums_1.EEmailActions.FORGOT_PASSWORD, {
                token: actionToken,
            });
            await models_1.OldPassword.create({ _user_id: user._id, password: user.password });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async setForgotPassword(password, id, token) {
        try {
            const hashedPassword = await password_service_1.passwordService.hash(password);
            await models_1.User.updateOne({ _id: id }, { password: hashedPassword });
            await models_1.Action.deleteOne({
                actionToken: token,
                tokenType: enums_1.EActionTokenType.forgot,
            });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async sendActivateToken(user) {
        try {
            const actionToken = token_service_1.tokenService.generateActionToken({ _id: user._id }, enums_1.EActionTokenType.activate);
            await models_1.Action.create({
                actionToken,
                tokenType: enums_1.EActionTokenType.activate,
                _user_id: user._id,
            });
            await email_service_1.emailService.sendMail(user.email, enums_1.EEmailActions.ACTIVATE, {
                token: actionToken,
            });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async activate(userId) {
        try {
            await Promise.all([
                models_1.User.updateOne({ _id: userId }, { $set: { status: enums_1.EUserStatus.active } }),
                models_1.Token.deleteMany({
                    _user_id: userId,
                    tokenType: enums_1.EActionTokenType.activate,
                }),
            ]);
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
}
exports.authService = new AuthService();
