"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategory = void 0;
const mongoose_1 = require("mongoose");
const SubCategorySchema = new mongoose_1.Schema({
    subCategoryName: {
        type: String,
        trim: true,
        required: true,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
exports.SubCategory = (0, mongoose_1.model)("subCategory", SubCategorySchema);
