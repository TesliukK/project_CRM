import { model, Schema } from "mongoose";

import { IReturnItem } from "../types";

const returnItemSchema = new Schema<IReturnItem>(
  {
    item: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Item",
    },
    quantity: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

export const ReturnItem = model<IReturnItem>("ReturnItem", returnItemSchema);
