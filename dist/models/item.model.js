"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Items = void 0;
const mongoose_1 = require("mongoose");
const itemSchema = new mongoose_1.Schema({
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    subCategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true,
    },
    nameItem: {
        type: String,
        trim: true,
        required: true,
    },
    brand: {
        type: String,
        trim: true,
        required: true,
    },
    color: {
        type: String,
        trim: true,
        required: true,
    },
    size: {
        type: String,
        trim: true,
        required: true,
    },
    price: {
        type: Number,
        trim: true,
        required: true,
    },
    material: {
        type: String,
        trim: true,
    },
    count: {
        type: Number,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
exports.Items = (0, mongoose_1.model)("item", itemSchema);
