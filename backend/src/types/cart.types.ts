import { ICartItem } from "./cartItem.types";

export interface ICart {
  _id: string;
  user: string;
  items: ICartItem[];
}
