import Joi from "joi";

export class CategoryValidator {
  private static categoryName = Joi.string().min(2).max(50).trim();

  static createCategory = Joi.object({
    categoryName: this.categoryName.required(),
  });

  static updateCategory = Joi.object({
    categoryName: this.categoryName,
  });
}
