import { model, Schema } from "mongoose";

import { EUserRole } from "../enums";
import { IUser } from "../types";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      index: true,
      required: [true, "Ім'я є обов'язковим"],
    },
    secondName: {
      type: String,
      index: true,
      required: [true, "Призвіще є обов'язковим"],
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "Номер телефону є обов'язковий"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Електронна пошта є обов'язковою"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Пароль є обов'язковим"],
    },
    role: {
      type: String,
      enum: EUserRole,
      default: EUserRole.default,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const User = model<IUser>("user", userSchema);
