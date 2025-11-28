import { instance } from "@/api/instance";
import {
  API_POST_DELETE,
  API_POST_LIKE,
  API_POST_SAVE,
  API_POSTS,
  API_POSTS_SAVED,
} from "@/constants/api";

import {
  TLikePostResponse,
  TPostRequest,
  TPostResponse,
  TSavedPostResponse,
} from "./types";

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

export const likePost = async (postId: string) => {
  return await instance
    .post<TLikePostResponse>(API_POST_LIKE(postId))
    .then((res) => res.data);
};

export const getSavedPosts = async () => {
  return await instance
    .get<TPostResponse[]>(API_POSTS_SAVED)
    .then((res) => res.data);
};

export const savedPost = async (postId: string) => {
  return await instance
    .post<TSavedPostResponse>(API_POST_SAVE(postId))
    .then((res) => res.data);
};
