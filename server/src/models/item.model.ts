import { model, Schema } from "mongoose";

import { EItemSeasonEnum } from "../enums";
import { IItem } from "../types";

const itemSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    nameItem: {
      type: String,
      trim: true,
      required: true,
    },
    color: {
      type: String,
      trim: true,
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Items = model<IItem>("item", itemSchema);
