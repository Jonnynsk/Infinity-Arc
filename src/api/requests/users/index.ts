import { instance } from "@/api/instance";
import {
  API_USERS_AVATAR,
  API_USERS_BY_USERNAME,
  API_USERS_PROFILE,
} from "@/constants/api";

import {
  TProfileRequest,
  TProfileResponse,
  TUploadAvatarResponse,
} from "./types";

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

export const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);

  return await instance
    .post<TUploadAvatarResponse>(API_USERS_AVATAR, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export const getUserByUsername = async (username: string) => {
  return await instance
    .get<TProfileResponse>(API_USERS_BY_USERNAME(username))
    .then((res) => res.data);
};
