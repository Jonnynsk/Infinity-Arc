import axios from "axios";

import { refresh } from "./requests";

import { errorCatch } from "@/helpers/utils";
import { getAccessToken, removeToken } from "@/helpers/cookies";

const options = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const api = axios.create(options);
export const instance = axios.create(options);

instance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      (errorCatch(error) === "jwt expired" ||
        errorCatch(error) === "Unauthorized") &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        await refresh();

        return instance(originalRequest);
      } catch (refreshError) {
        if (
          errorCatch(refreshError) === "jwt expired" ||
          errorCatch(refreshError) === "jwt must be provided" ||
          errorCatch(refreshError) === "Unauthorized"
        ) {
          removeToken();
        }

        throw refreshError;
      }
    }

    if (errorCatch(error) === "jwt must be provided") {
      removeToken();
    }

    throw error;
  }
);
