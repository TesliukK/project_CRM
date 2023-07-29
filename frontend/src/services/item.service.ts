import { urls } from "../configs";
import { IItem } from "../interfaces";
import { apiService, IRes } from "./api.service";

const itemService = {
  getAll: (): IRes<IItem[]> => apiService.get(urls.items.base)
};

export {
  itemService
}