import { model, Schema, Types } from "mongoose";

import { Item } from "./item.model";
import { User } from "./user.model";

const basketSchema = new Schema({
  _user_id: {
    type: Types.ObjectId,
    required: true,
    ref: User,
  },
});

export const Basket = model("basket", basketSchema);

const basketItemSchema = new Schema({
  _item_id: {
    type: Types.ObjectId,
    required: true,
    ref: Basket,
  },
  _basket_id: {
    type: Types.ObjectId,
    required: true,
    ref: Item,
  },
});

export const BasketItem = model("basketItem", basketItemSchema);
