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

}

export interface IData {
  page: number,
  totalPages: number,
  itemsCount: number,
  itemsFound: number,
  perPage: number,
  data: [];
}