import { EUserRole } from "../enums";

export interface IUser {
  _id?: string;
  firstName: string;
  secondName: string;
  phone?: string;
  email: string;
  password: string;
  role: EUserRole;
  soldItem: string;
}
