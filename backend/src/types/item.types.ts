import { Types } from "mongoose";

import { EDepartment, EItemCategories } from "../enums";

export interface IItem {
  _id?: Types.ObjectId;
  category: EItemCategories;
  department: EDepartment;
  itemName: string;
  brand: string;
  article: string;
  size: string;
  price: number;
  count: number;
  createAt: Date;
}
