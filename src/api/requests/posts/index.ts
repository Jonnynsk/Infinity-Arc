import { instance } from "@/api/instance";
import { API_POSTS } from "@/constants/api";

import { TPostRequest, TPostResponse } from "./types";

export const getPosts = async () => {
  return await instance.get<TPostResponse[]>(API_POSTS).then((res) => res.data);
};

export const createPost = async (data: TPostRequest) => {
  return await instance
    .post<TPostResponse>(API_POSTS, data)
    .then((res) => res.data);
};
