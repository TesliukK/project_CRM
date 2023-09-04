"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const services_1 = require("../services");
class UserController {
    async getAll(req, res, next) {
        try {
            const users = await services_1.userService.getWithPagination(req.query);
            return res.json(users);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const { user } = res.locals;
            return res.json(user);
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const { params, body } = req;
            const updatedUser = await services_1.userService.update(params.userId, body);
            return res.status(201).json(updatedUser);
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            const { userId } = req.params;
            await services_1.userService.delete(userId);
            return res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserController();
