"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemValidator = void 0;
const Joi = __importStar(require("joi"));
class ItemValidator {
}
exports.ItemValidator = ItemValidator;
_a = ItemValidator;
ItemValidator.nameItem = Joi.string().min(2).max(50).trim();
ItemValidator.brand = Joi.string().min(2).max(50).trim();
ItemValidator.size = Joi.string().min(0).max(20).trim().lowercase();
ItemValidator.price = Joi.number().min(1).max(100000);
ItemValidator.color = Joi.string().min(2).max(50).trim();
ItemValidator.material = Joi.string().min(2).max(50).trim();
ItemValidator.count = Joi.number().min(1).max(100000);
ItemValidator.categoryId = Joi.string().trim().required();
ItemValidator.subCategoryId = Joi.string().trim().required();
ItemValidator.createItem = Joi.object({
    nameItem: _a.nameItem.required(),
    brand: _a.brand.required(),
    size: _a.size.required(),
    price: _a.price.required(),
    color: _a.color.required(),
    material: _a.material.required(),
    count: _a.count.required(),
    categoryId: _a.categoryId,
    subCategoryId: _a.subCategoryId
});
ItemValidator.updateItem = Joi.object({
    nameItem: _a.nameItem,
    brand: _a.brand,
    price: _a.price,
    color: _a.color,
    material: _a.material
});
