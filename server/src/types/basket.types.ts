import { Types } from "mongoose";

import { IItem } from "./item.types";
import { IUser } from "./user.types";

export interface IBasket {
  _id?: Types.ObjectId;
  user: IUser | Types.ObjectId;
}

export interface IBasketItem {
  _id?: Types.ObjectId;
  item: IItem | Types.ObjectId;
  basket: IBasket | Types.ObjectId;
}
