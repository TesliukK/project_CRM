export interface IUser {
  _id?: string;
  firstName: string;
  secondName: string;
  phone?: string;
  email: string;
  password: string;
  address: {
    region: string;
    city: string;
    postOffice: string;
  };
  card: [];
  orders: [];
  role: string;
}
