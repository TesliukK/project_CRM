import { Types } from "mongoose";

import { ICategory } from "./category.types";

export interface ISubCategory {
  _id?: Types.ObjectId;
  subcategoryName: string;
  category: ICategory;
}
