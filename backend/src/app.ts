import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { configs } from "./configs";
import { cronRunner } from "./crons";
import { ApiError } from "./errors";
import { authRouter, itemRouter, soldRouter, userRouter } from "./routers";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/sold", soldRouter);
app.use("/items", itemRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
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
      await mongoose.connect(configs.DB_URL);
      dbCon = true;
    } catch (e) {
      console.log("database unavailable, wait 3 second");
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
};

const start = async () => {
  try {
    cronRunner();
    await connectionDB();
    await app.listen(configs.PORT, () => configs.HOST);
    console.log(`Server has started on PORT ${configs.PORT} 🚀🚀🚀`);
  } catch (e) {
    console.log(e);
  }
};

start();
