"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
exports.configs = {
    PORT: process.env.PORT || 5001,
    DB_URL: process.env.DB_URL || "mongosdcmjc",
    HOST: "0.0.0.0",
    FRONT_URL: process.env.FRONT_URL,
    ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "aqwdaa",
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "aaqwda",
    FORGOT_SECRET: process.env.JWT_FORGOT_SECRET,
    ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET,
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,
};
