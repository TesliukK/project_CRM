import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { createBrowserHistory } from "history";

import { baseURL } from "../configs";
import { IUser } from "../interfaces";
import { authService } from "./auth.service";

const history = createBrowserHistory();

export type IRes<T> = Promise<AxiosResponse<T>>
const apiService = axios.create({ baseURL });

apiService.interceptors.request.use((config: AxiosRequestConfig) => {
  if (authService.isAuthenticated()) {
    const access = authService.getAccessToken();
    if (access) {
      config.headers = {
        ...config.headers,
        Authorization: access
      };
    }
    const refresh = authService.getRefreshToken();
    if (refresh){
      config.headers = {
        ...config.headers,
        'Refresh-Token': refresh
      }
    }
  }

  return config;
});

let isRefreshing = false;
apiService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const refresh = authService.getRefreshToken();

    if (error.response?.status === 401 && refresh && !isRefreshing) {
      isRefreshing = true;
      try {
        const response = await authService.refresh(refresh);
        if (response.status === 200) {
          isRefreshing = false;
          return apiService(error.config);
        }
      } catch (e) {
        authService.deleteTokens();
        history.replace('/login?expSession=true');
      }
      isRefreshing = false;
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);



export { apiService };