import { model, Schema, Types } from "mongoose";

import { ISubCategory } from "../types";

const SubCategorySchema = new Schema(
  {
    categoryId: {
      type: Types.ObjectId,
      ref: "Category", // посилання на батьківську модель категорії
      required: true,
    },
    subcategoryName: {
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
  SubCategorySchema
);
