import { Document, Types } from "mongoose";

import { IItem } from "./item.types";

export interface ISoldItem extends Document {
  item: IItem;
  sellerId: Types.ObjectId;
  price: number;
  quantity: number;
  soldAt: Date;
}
