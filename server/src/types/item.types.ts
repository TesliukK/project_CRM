import { Types } from "mongoose";

import { ICategory } from "./category.types";

export interface IItem {
  _id?: Types.ObjectId;
  category: ICategory;
  nameItem: string;
  color: string;
  size: string;
  price: number;
  material: string;
  season: string;
  count: number;
}
