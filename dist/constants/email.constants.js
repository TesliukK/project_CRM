"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allTemplates = void 0;
const enums_1 = require("../enums");
exports.allTemplates = {
    [enums_1.EEmailActions.WELCOME]: {
        subject: "Great to see you in our app!",
        templateName: "register",
    },
    [enums_1.EEmailActions.FORGOT_PASSWORD]: {
        subject: "We control your password, just follow all steps and everything will be good",
        templateName: "forgotPassword",
    },
    [enums_1.EEmailActions.ACTIVATE]: {
        subject: "activate account",
        templateName: "activate",
    },
};
