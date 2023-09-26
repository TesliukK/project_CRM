import { model, Schema } from "mongoose";

import { IReturnItem } from "../types"; // Переконайтеся, що шлях правильний, і імпортовано правильний тип

const returnItemSchema = new Schema<IReturnItem>(
  {
    item: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Item", // Посилання на модель товару (може бути інше, якщо у вас інакша назва моделі)
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
