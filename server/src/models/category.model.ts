import { model, Schema } from "mongoose";

import { ICategory } from "../types";

const CategorySchema = new Schema(
  {
    categoryName: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Category = model<ICategory>("category", CategorySchema);
