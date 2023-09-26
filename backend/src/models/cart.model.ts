import { model, Schema } from "mongoose";

import { ICart } from "../types";

const cartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Items" }, // Ідентифікатор товару, може бути посиланням на іншу модель "Product"
  quantity: { type: Number, default: 1 }, // Кількість одиниць товару в корзині (за замовчуванням 1)
});

const cartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", unique: true }, // Зв'язок із моделлю користувача "User"
    items: [cartItemSchema], // Масив товарів в корзині, який використовує модель "CartItem"
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Cart = model<ICart>("cart", cartSchema);
