export interface IItem {
  _id: string;
  category: string;
  itemName: string;
  brand: string;
  article: string;
  size: string;
  price: number;
  count: number;
  department: string;
  createAt: string;
}

export interface IData {
  page: number,
  totalPages: number,
  itemsCount: number,
  itemsFound: number,
  perPage: number,
  data: [];
}

export interface IQuery {
  page: string;
  limit: string;
  sortedBy: string;
  [key: string]: string;
}