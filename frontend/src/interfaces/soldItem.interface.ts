export interface ISoldItem {
  _id: string;
  itemId: string;
  seller: {
    _id: string;
    firstName: string;
    secondName: string;
    email: string;
  };
  price: number;
  quantity: number;
  soldAt: string;
}