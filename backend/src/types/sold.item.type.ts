import { Document } from "mongoose";

import { IItem } from "./item.types";

export interface ISoldItem extends Document {
  item: IItem;
  seller: {
    _id: string;
    firstName: string;
    secondName: string;
    email: string;
  };
  price: number;
  quantity: number;
  soldAt: Date;
}
