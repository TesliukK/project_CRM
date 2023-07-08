import { model, Schema } from "mongoose";

import { EItemSeasonEnum } from "../enums";
import { IItem } from "../types";

const itemSchema = new Schema(
  {
    nameItem: {
      type: String,
      trim: true,
      required: true,
    },
    brand: {
      type: String,
      trim: true,
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
    color: {
      type: String,
      trim: true,
      required: true,
    },
    material: {
      type: String,
      trim: true,
    },
    season: {
      type: String,
      enum: EItemSeasonEnum,
      required: true,
    },
    count: {
      type: Number,
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

export const Item = model<IItem>("item", itemSchema);
