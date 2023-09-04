"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("./user.model");
const tokensSchema = new mongoose_1.Schema({
    _user_id: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: user_model_1.User,
    },
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
exports.Token = (0, mongoose_1.model)("Token", tokensSchema);
