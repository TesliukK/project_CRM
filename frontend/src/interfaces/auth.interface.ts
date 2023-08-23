import { IUser } from "./user.interface";

export type ICredentials = Pick<IUser, "email" | "password">;