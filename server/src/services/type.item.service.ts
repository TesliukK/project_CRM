import { Types } from "mongoose";

import { ApiError } from "../errors";
import { CategoryOfItem } from "../models";
import { ICategoryOfItemSchema } from "../types";

class TypeOfItemService {
  public async create(
    data: ICategoryOfItemSchema,
    userId: string
  ): Promise<any> {
    try {
      return CategoryOfItem.create({
        ...data,
        user: new Types.ObjectId(userId),
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const typeItemService = new TypeOfItemService();
