import { instance } from "@/api/instance";
import { API_USERS_GET_PROFILE } from "@/constants/api";

export const getProfile = async () => {
  return await instance.get(API_USERS_GET_PROFILE).then((res) => res.data);
};
