"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const enums_1 = require("../enums");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        index: true,
        required: [true, "Ім'я є обов'язковим"],
    },
    secondName: {
        type: String,
        index: true,
        required: [true, "Призвіще є обов'язковим"],
    },
    phone: {
        type: String,
        unique: true,
        required: [true, "Номер телефону є обов'язковий"],
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Електронна пошта є обов'язковою"],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Пароль є обов'язковим"],
    },
    address: {
        region: { type: String },
        city: { type: String },
        postOffice: { type: String },
    },
    status: {
        type: String,
        enum: enums_1.EUserStatus,
        default: enums_1.EUserStatus.inactive,
    },
    role: {
        type: String,
        enum: enums_1.EUserRole,
        default: enums_1.EUserRole.default,
    },
    cartId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Cart" },
}, {
    versionKey: false,
    timestamps: true,
});
exports.User = (0, mongoose_1.model)("user", userSchema);
