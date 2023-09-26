import { urls } from "../configs";
import { IData, ISoldItem } from "../interfaces";
import { apiService, IRes } from "./api.service";

const soldItemService = {
  getAll: (page=1): IRes<IData> => apiService.get(urls.sold.base, {params:{page}}),
  // byId: (id:string)=> apiService.get(`${urls.items}/${id}`),
  create: (data:ISoldItem) => apiService.post(urls.sold.base, data),
  // update: (id: string, data: Partial<IItem>): IRes<IItem> =>
  //   apiService.put(`${urls.items.base}/${id}`, data),
  delete: (id: string): IRes<void> => apiService.delete(`${urls.sold.base}/${id}`),
};

export {
  soldItemService
}