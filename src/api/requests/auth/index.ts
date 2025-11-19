import { api, instance } from "@/api/instance";
import {
  API_AUTH_LOGIN,
  API_AUTH_REGISTER,
  API_AUTH_REFRESH,
  API_AUTH_LOGOUT,
  API_AUTH_CHANGE_PASSWORD,
} from "@/constants/api";
import { saveToCookies } from "@/helpers/cookies";

import {
  TAuthResponse,
  TChangePasswordRequest,
  TLoginRequest,
  TRegisterRequest,
} from "./types";

export const register = async (data: TRegisterRequest) => {
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

export const logout = async () => {
  return await api.post(API_AUTH_LOGOUT).then((res) => {
    return res.data;
  });
};

export const changePassword = async (data: TChangePasswordRequest) => {
  return await instance.post(API_AUTH_CHANGE_PASSWORD, data).then((res) => {
    return res.data;
  });
};
