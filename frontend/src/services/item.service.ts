import { urls } from "../configs";
import { IData, IItem } from "../interfaces";
import { apiService, IRes } from "./api.service";

const itemService = {
  getAll: (): IRes<IData> => apiService.get(urls.items.base),
  create: (data:IItem) => apiService.post(urls.items.base, data),
  update: (id: string, data: Partial<IItem>): IRes<IItem> =>
    apiService.put(`${urls.items.base}/${id}`, data),
  delete: (id: string): IRes<void> => apiService.delete(`${urls.items.base}/${id}`),
};

export {
  itemService
}