import { model, Schema, Types } from "mongoose";

import { EItemSeasonEnum } from "../enums";
import { ICategoryOfItemSchema, IItem } from "../types";

const CategoryOfItemSchema = new Schema({
  nameOfType: {
    type: String,
    trim: true,
    required: true,
  },
});

export const CategoryOfItem = model<ICategoryOfItemSchema>(
  "typeOfItemSchema",
  CategoryOfItemSchema
);

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
    typeOfItemSchema: {
      type: Types.ObjectId,
      ref: CategoryOfItem,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Item = model<IItem>("item", itemSchema);
