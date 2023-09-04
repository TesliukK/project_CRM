"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronRunner = void 0;
const remove_old_password_cron_1 = require("./remove.old.password.cron");
const remove_old_token_cron_1 = require("./remove.old.token.cron");
const cronRunner = () => {
    remove_old_token_cron_1.removeOldToken.start();
    remove_old_password_cron_1.removeOldPasswords.start();
};
exports.cronRunner = cronRunner;
