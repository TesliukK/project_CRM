import { model, Schema, Types } from "mongoose";

import { ISoldItem } from "../types";

const soldItemSchema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Items",
    },
    seller: {
      _id: {
        type: Types.ObjectId,
      },
      firstName: {
        type: String,
      },
      secondName: {
        type: String,
      },
      email: {
        type: String,
      },
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    soldAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

export const SoldItem = model<ISoldItem>("SoldItem", soldItemSchema);
