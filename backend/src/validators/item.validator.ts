import * as Joi from "joi";

import { EDepartment, EItemCategories } from "../enums";

export class ItemValidator {
  private static article = Joi.string().min(2).max(50).trim();
  private static brand = Joi.string().min(2).max(50).trim();
  private static size = Joi.string().min(0).max(20).trim().lowercase();
  private static price = Joi.number().min(1).max(100000);
  private static count = Joi.number().min(1).max(100000);
  private static category = Joi.string().valid(
    EItemCategories.default,
    EItemCategories.accessories,
    EItemCategories.clothing,
    EItemCategories.shoes,
  );
  private static department = Joi.string().valid(
    EDepartment.mirellaModa,
    EDepartment.miniMax,
  );
  private static itemName = Joi.string().min(2).max(50).trim();
  static createItem = Joi.object({
    article: this.article.required(),
    brand: this.brand.required(),
    size: this.size.required(),
    price: this.price.required(),
    count: this.count.required(),
    category: this.category.required(),
    department: this.department.required(),
    itemName: this.itemName,
  });

  static updateItem = Joi.object({
    article: this.article,
    brand: this.brand,
    size: this.size,
    price: this.price,
    count: this.count,
    category: this.category,
    department: this.department,
    itemName: this.itemName,
  });
}
