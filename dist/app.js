"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const configs_1 = require("./configs");
const crons_1 = require("./crons");
const routers_1 = require("./routers");
const cart_router_1 = require("./routers/cart.router");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/cart", cart_router_1.cartRouter);
app.use("/subcategories", routers_1.subCategoryRouter);
app.use("/categories", routers_1.categoryRouter);
app.use("/items", routers_1.itemRouter);
app.use("/users", routers_1.userRouter);
app.use("/auth", routers_1.authRouter);
app.use((err, req, res, next) => {
    const status = err.status || 500;
    return res.status(status).json({
        message: err.message,
        status,
    });
});
const connectionDB = async () => {
    let dbCon = false;
    while (!dbCon) {
        try {
            console.log("connecting to database...");
            await mongoose_1.default.connect(configs_1.configs.DB_URL);
            dbCon = true;
        }
        catch (e) {
            console.log("database unavailable, wait 3 second");
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }
};
const start = async () => {
    try {
        (0, crons_1.cronRunner)();
        await connectionDB();
        await app.listen(configs_1.configs.PORT, () => configs_1.configs.HOST);
        console.log(`Server has started on PORT ${configs_1.configs.PORT} 🚀🚀🚀`);
    }
    catch (e) {
        console.log(e);
    }
};
start();
