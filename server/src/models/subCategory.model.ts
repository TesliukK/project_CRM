import { model, Schema } from "mongoose";

import { ISubCategory } from "../types";

const SubcategorySchema = new Schema(
  {
    name: {
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

export const SubCategory = model<ISubCategory>(
  "subCategory",
  SubcategorySchema
);
