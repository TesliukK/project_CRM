import { IItem } from "./item.types";

export interface IReturnItem extends Document {
  item: IItem;
  quantity: number;
  createdAt: Date;
}
