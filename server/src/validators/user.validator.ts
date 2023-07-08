import * as Joi from "joi";

import { regexConstants } from "../constants";

export class UserValidator {
  private static firstName = Joi.string().min(2).max(50).trim();
  private static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .lowercase()
    .trim();
  private static password = Joi.string().regex(regexConstants.PASSWORD);
  private static phone = Joi.string().regex(regexConstants.PHONE);
  private static address = Joi.object({
    city: Joi.string().min(2).max(50).trim(),
    postOffice: Joi.string().min(2).max(50).trim(),
  });

  static createUser = Joi.object({
    name: this.firstName.required(),
    email: this.email.required(),
    password: this.password.required(),
    phone: this.phone.required(),
    address: this.address.required(),
  });

  static updateUser = Joi.object({
    name: this.firstName,
    phone: this.phone,
  });

  static loginUser = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  static emailValidator = Joi.object({
    email: this.email.required(),
  });

  static changeUserPassword = Joi.object({
    oldPassword: this.password.required(),
    newPassword: this.password.required(),
  });
}
