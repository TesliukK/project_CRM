import { Types } from "mongoose";

import { ICategory } from "./category.types";

export interface IItem {
  _id?: Types.ObjectId;
  nameItem: string;
  brand: string;
  size: string;
  price: number;
  color: string;
  material: string;
  season: string;
  count: number;
  category: ICategory;
}
