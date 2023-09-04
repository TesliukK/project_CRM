"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    categoryName: {
        type: String,
        trim: true,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
exports.Category = (0, mongoose_1.model)("category", CategorySchema);
