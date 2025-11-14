import { api } from "@/api/instance";
import {
  API_AUTH_LOGIN,
  API_AUTH_REGISTER,
  API_AUTH_REFRESH,
} from "@/constants/api";
import { saveToCookies } from "@/helpers/cookies";

import { TAuthResponse, TLoginRequest } from "./types";

export const register = async (data: any) => {
  return await api.post<TAuthResponse>(API_AUTH_REGISTER, data).then((res) => {
    if (res.data.accessToken) {
      saveToCookies(res.data.accessToken);
    }

    return res.data;
  });
};

export const login = async (data: TLoginRequest) => {
  return await api.post<TAuthResponse>(API_AUTH_LOGIN, data).then((res) => {
    if (res.data.accessToken) {
      saveToCookies(res.data.accessToken);
    }

    return res.data;
  });
};

export const refresh = async () => {
  return await api.post<TAuthResponse>(API_AUTH_REFRESH).then((res) => {
    if (res.data.accessToken) {
      saveToCookies(res.data.accessToken);
    }

    return res.data;
  });
};
