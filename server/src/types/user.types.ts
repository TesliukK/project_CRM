export interface IUser {
  _id?: string;
  name: string;
  phone?: string;
  email: string;
  password: string;
  address: {
    city: string;
    postOffice: string;
  };
  card: [];
  orders: [];
  role: string;
}
