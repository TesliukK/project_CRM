import {urls} from "../configs";
import {IItem} from "../interfaces";
import {apiService, IRes} from "./api.service";

const itemService = {
    getAll: (page = 1, sortedBy = "createAt", search="") =>
        apiService.get(urls.items.base, {params: {page, sortedBy, search}}),
    byId: (id: string) => apiService.get(`${urls.items}/${id}`),
    create: (data: IItem) => apiService.post(urls.items.base, data),
    update: (id: string, data: Partial<IItem>): IRes<IItem> =>
        apiService.put(`${urls.items.base}/${id}`, data),
    delete: (id: string): IRes<void> => apiService.delete(`${urls.items.base}/${id}`)
};

export {
    itemService
}