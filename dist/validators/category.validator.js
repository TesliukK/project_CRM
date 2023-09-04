"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidator = void 0;
const joi_1 = __importDefault(require("joi"));
class CategoryValidator {
}
exports.CategoryValidator = CategoryValidator;
_a = CategoryValidator;
CategoryValidator.categoryName = joi_1.default.string().min(2).max(50).trim();
CategoryValidator.createCategory = joi_1.default.object({
    categoryName: _a.categoryName.required(),
});
CategoryValidator.updateCategory = joi_1.default.object({
    categoryName: _a.categoryName,
});
