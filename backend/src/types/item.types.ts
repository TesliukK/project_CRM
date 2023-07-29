import { Types } from "mongoose";

import { ICategory } from "./category.types";
import { ISubCategory } from "./subCategory.types";

export interface IItem {
  _id?: Types.ObjectId;
  category: ICategory;
  subCategory: ISubCategory;
  nameItem: string;
  color: string;
  size: string;
  price: number;
  material: string;
  season: string;
  count: number;
}
