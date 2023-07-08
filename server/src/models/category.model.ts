import { model, Schema } from "mongoose";

import { ICategory } from "../types";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    subCategories: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Category = model<ICategory>("category", CategorySchema);
