import { urls } from "../configs";
import { IData } from "../interfaces";
import { ICategory } from "../interfaces";
import { apiService, IRes } from "./api.service";

const categoryService = {
  getAll: (): IRes<ICategory[]> => apiService.get(urls.categories.base),
  create: (data:ICategory) => apiService.post(urls.categories.base, data),
  delete: (id: string): IRes<void> => apiService.delete(`${urls.categories.base}/${id}`),
};

export {
  categoryService
}