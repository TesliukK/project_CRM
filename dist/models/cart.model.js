"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const cartItemSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Items" },
    quantity: { type: Number, default: 1 },
});
const cartSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", unique: true },
    items: [cartItemSchema],
}, {
    versionKey: false,
    timestamps: true,
});
exports.Cart = (0, mongoose_1.model)("cart", cartSchema);
