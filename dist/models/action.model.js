"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
const mongoose_1 = require("mongoose");
const enums_1 = require("../enums");
const user_model_1 = require("./user.model");
const actionTokensSchema = new mongoose_1.Schema({
    _user_id: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: user_model_1.User,
    },
    actionToken: {
        type: String,
        required: true,
    },
    tokenType: {
        type: String,
        enum: enums_1.EActionTokenType,
    },
}, {
    versionKey: false,
    timestamps: true,
});
exports.Action = (0, mongoose_1.model)("ActionToken", actionTokensSchema);
