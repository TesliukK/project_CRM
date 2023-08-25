export interface IItem {
  _id: string;
  categoryId: string;
  subCategoryId: string;
  nameItem: string;
  brand: string;
  color: string;
  size: string;
  price: number;
  material: string;
  season: string;
  count: number;
}
export interface IData {
  page: number,
  totalPages: number,
  itemsCount: number,
  itemsFound: number,
  perPage: number,
  data: [];
}