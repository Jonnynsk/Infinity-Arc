import { instance } from "@/api/instance";
import {
  API_FOLLOWS,
  API_FOLLOWS_FOLLOWERS,
  API_FOLLOWS_FOLLOWING,
  API_FOLLOWS_UNFOLLOW,
} from "@/constants/api";

import { TFollowUserResponse, TFollowUsersResponse } from "./types";

export const followUser = async (userId: string) => {
  return await instance
    .post<TFollowUserResponse>(API_FOLLOWS, { userId })
    .then((res) => res.data);
};

export const unfollowUser = async (userId: string) => {
  return await instance
    .delete<TFollowUserResponse>(API_FOLLOWS_UNFOLLOW(userId))
    .then((res) => res.data);
};

export const getFollowing = async () => {
  return await instance
    .get<TFollowUsersResponse>(API_FOLLOWS_FOLLOWING)
    .then((res) => res.data);
};

export const getFollowers = async () => {
  return await instance
    .get<TFollowUsersResponse>(API_FOLLOWS_FOLLOWERS)
    .then((res) => res.data);
};
