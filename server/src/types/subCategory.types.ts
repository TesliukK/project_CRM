import { Types } from "mongoose";

export interface ISubCategory {
  _id?: Types.ObjectId;
  categoryId: Types.ObjectId;
  subcategoryName: string;
}
