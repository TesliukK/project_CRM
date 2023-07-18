import Joi from "joi";

export class SubCategoryValidator {
  private static subCategoryName = Joi.string().min(2).max(50).trim();

  static createSubCategory = Joi.array().items(Joi.string());

  static updateSubCategory = Joi.object({
    subCategoryName: this.subCategoryName,
  });
}
