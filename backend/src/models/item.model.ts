import { model, Schema } from "mongoose";

import { EDepartment, EItemCategories } from "../enums";
import { IItem } from "../types";

const itemSchema = new Schema(
  {
    category: {
      type: String,
      enum: EItemCategories,
      required: true,
    },
    department: {
      type: String,
      enum: EDepartment,
      required: true,
    },
    itemName: {
      type: String,
      trim: true,
      required: true,
    },
    brand: {
      type: String,
      trim: true,
      required: true,
    },
    article: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Items = model<IItem>("item", itemSchema);
