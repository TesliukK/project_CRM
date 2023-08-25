import * as Joi from "joi";

export class ItemValidator {
  private static nameItem = Joi.string().min(2).max(50).trim();
  private static brand = Joi.string().min(2).max(50).trim();
  private static size = Joi.string().min(0).max(20).trim().lowercase();
  private static price = Joi.number().min(1).max(100000);
  private static color = Joi.string().min(2).max(50).trim();
  private static material = Joi.string().min(2).max(50).trim();
  private static count = Joi.number().min(1).max(100000);
  private static categoryId = Joi.string().trim().required();
  private static subCategoryId = Joi.string().trim().required();
  static createItem = Joi.object({
    nameItem: this.nameItem.required(),
    brand: this.brand.required(),
    size: this.size.required(),
    price: this.price.required(),
    color: this.color.required(),
    material: this.material.required(),
    count: this.count.required(),
    categoryId: this.categoryId,
    subCategoryId: this.subCategoryId
  });

  static updateItem = Joi.object({
    nameItem: this.nameItem,
    brand: this.brand,
    price: this.price,
    color: this.color,
    material: this.material
  });
}
