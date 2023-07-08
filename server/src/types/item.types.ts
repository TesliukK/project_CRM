import { Types } from "mongoose";

export interface IItem {
  _id?: Types.ObjectId;
  categoryOfItemSchema: ICategoryOfItemSchema;
  nameItem: string;
  brand: string;
  size: string;
  price: number;
  color: string;
  material: string;
  season: string;
}
export interface ICategoryOfItemSchema {
  _id?: Types.ObjectId;
  name: string;
}
