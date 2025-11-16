import { instance } from "@/api/instance";
import { API_USERS_PROFILE } from "@/constants/api";

import { TProfileResponse } from "./types";

export const getProfile = async () => {
  return await instance
    .get<TProfileResponse>(API_USERS_PROFILE)
    .then((res) => res.data);
};
