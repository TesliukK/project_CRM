import { model, Schema } from "mongoose";

import { ISubCategory } from "../types";

const SubCategorySchema = new Schema(
  {
    subCategoryName: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
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
  SubCategorySchema
);
