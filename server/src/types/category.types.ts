import { Types } from "mongoose";

import { ISubCategory } from "./subCategory.types";

export interface ICategory {
  _id?: Types.ObjectId;
  name: string;
  subCategory: ISubCategory;
}
