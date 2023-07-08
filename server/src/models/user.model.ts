import { model, Schema } from "mongoose";

import { EUserRole, EUserStatus } from "../enums";
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
    address: {
      region: { type: String },
      city: { type: String },
      postOffice: { type: String },
    },
    status: {
      type: String,
      enum: EUserStatus,
      default: EUserStatus.inactive,
    },
    role: {
      type: String,
      default: EUserRole.default,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model<IUser>("user", userSchema);
