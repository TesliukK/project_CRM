import { urls } from "../configs";
import { IData } from "../interfaces";
import { apiService, IRes } from "./api.service";


const userService = {
  getAll: (): IRes<IData> => apiService.get(urls.users.base),
  delete: (id: string): IRes<void> => apiService.delete(`${urls.users.base}/${id}`),
};

export {
  userService
}