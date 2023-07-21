export interface ICartItem {
  itemId: string;
  quantity: number;
}

export interface ICart {
  _id?: string;
  userId: string;
  items: ICartItem[];
}
