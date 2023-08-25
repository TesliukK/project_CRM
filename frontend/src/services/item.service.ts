import { urls } from "../configs";
import { IData, IItem } from "../interfaces";
import { apiService, IRes } from "./api.service";

const itemService = {
  getAll: (page=1): IRes<IData> => apiService.get(urls.items.base, {params:{page}}),
  create: (data:IItem) => apiService.post(urls.items.base, data),
  update: (id: string, data: Partial<IItem>): IRes<IItem> =>
    apiService.put(`${urls.items.base}/${id}`, data),
  delete: (id: string): IRes<void> => apiService.delete(`${urls.items.base}/${id}`),
};

export {
  itemService
}