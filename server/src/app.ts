import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { configs } from "./configs";
import { cronRunner } from "./crons";
import { ApiError } from "./errors";
import {
  authRouter,
  categoryRouter,
  itemRouter,
  subCategoryRouter,
  userRouter,
} from "./routers";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/subcategories", subCategoryRouter);
app.use("/categories", categoryRouter);
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

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  cronRunner();
  // eslint-disable-next-line
  console.log(`Server has started on PORT ${configs.PORT} 🚀🚀🚀`);
});
