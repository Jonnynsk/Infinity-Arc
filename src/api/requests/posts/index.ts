import { instance } from "@/api/instance";
import { API_POST_DELETE, API_POSTS } from "@/constants/api";

import { TPostRequest, TPostResponse } from "./types";

export const getPosts = async () => {
  return await instance.get<TPostResponse[]>(API_POSTS).then((res) => res.data);
};

export const createPost = async (data: TPostRequest) => {
  return await instance
    .post<TPostResponse>(API_POSTS, data)
    .then((res) => res.data);
};

export const deletePost = async (postId: string) => {
  return await instance.delete(API_POST_DELETE(postId)).then((res) => res.data);
};
