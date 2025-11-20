import { instance } from "@/api/instance";
import { API_USERS_PROFILE } from "@/constants/api";

import { TProfileRequest, TProfileResponse } from "./types";

export const getProfile = async () => {
  return await instance
    .get<TProfileResponse>(API_USERS_PROFILE)
    .then((res) => res.data);
};

export const updateProfile = async (data: TProfileRequest) => {
  return await instance
    .patch<TProfileResponse>(API_USERS_PROFILE, data)
    .then((res) => res.data);
};
