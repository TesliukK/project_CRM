
import { ICredentials, ITokenPair, IUser } from "../interfaces";
import {urls} from "../configs";
import { apiService } from "./api.service";

const accessTokenKey = 'access'
const refreshTokenKey = 'refresh'

const authService = {
  login: async function (cred:ICredentials) {
    const response = await apiService.post(urls.auth.login, cred);
    if (response.status === 200) {
      this.setTokens(response.data)
    }

    return response
  },
  refresh: async function (refresh: string) {
    const response = await apiService.post(urls.auth.refresh, { refresh });
    if (response.status === 200) {
      this.setTokens(response.data)
    }
    return response;
  },
  logout: () => {
    authService.deleteTokens();
  },
  register: (user:IUser)=>apiService.post(urls.auth.register, user),

  setTokens: ({accessToken, refreshToken}:ITokenPair):void => {
    localStorage.setItem(accessTokenKey, accessToken)
    localStorage.setItem(refreshTokenKey, refreshToken)
  },
  getAccessToken: () => localStorage.getItem(accessTokenKey),
  getRefreshToken: () => localStorage.getItem(refreshTokenKey),
  deleteTokens: () => {
    localStorage.removeItem(accessTokenKey)
    localStorage.removeItem(refreshTokenKey)
  },
  isAuthenticated: () => !!localStorage.getItem(accessTokenKey)
}

export {
  authService
}