import * as Joi from "joi";

import { EItemSeasonEnum } from "../enums";

export class ItemValidator {
  private static nameItem = Joi.string().min(2).max(50).trim();
  private static brand = Joi.string().min(2).max(20).trim().lowercase();
  private static size = Joi.string().min(0).max(20).trim().lowercase();
  private static price = Joi.number().min(1).max(100000);
  private static color = Joi.string().min(2).max(50).trim();
  private static material = Joi.string().min(2).max(50).trim();
  private static season = Joi.valid(...Object.values(EItemSeasonEnum));
  private static count = Joi.number().min(1).max(100000);
  private static categoryId = Joi.string().trim().required();
  static createItem = Joi.object({
    nameItem: this.nameItem.required(),
    brand: this.brand.required(),
    size: this.size.required(),
    price: this.price.required(),
    color: this.color.required(),
    material: this.material.required(),
    season: this.season.required(),
    count: this.count.required(),
    categoryId: this.categoryId,
  });

  static updateItem = Joi.object({
    nameItem: this.nameItem,
    brand: this.brand,
    price: this.price,
    color: this.color,
    material: this.material,
    season: this.season,
  });
}
