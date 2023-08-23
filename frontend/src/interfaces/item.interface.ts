export interface IItem {
  _id: string;
  categoryId: string;
  subCategoryId: string;
  nameItem: string;
  color: string;
  size: string;
  price: number;
  material: string;
  season: string;
  count: number;
}
export interface IData {
  page: number,
  itemsCount: number,
  itemsFound: number,
  perPage: number,
  data: [];
}