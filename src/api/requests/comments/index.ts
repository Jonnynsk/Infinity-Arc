import { instance } from "@/api/instance";
import { API_COMMENTS_POST, API_COMMENTS_UPDATE } from "@/constants/api";

import { TCommentResponse } from "./types";

export const getComments = async (postId: string) => {
  return await instance
    .get<TCommentResponse[]>(API_COMMENTS_POST(postId))
    .then((res) => res.data);
};

export const createComment = async (postId: string, content: string) => {
  return await instance
    .post<TCommentResponse>(API_COMMENTS_POST(postId), { content })
    .then((res) => res.data);
};

export const updateComment = async (
  postId: string,
  commentId: string,
  content: string
) => {
  return await instance
    .patch<TCommentResponse>(API_COMMENTS_UPDATE(postId, commentId), {
      content,
    })
    .then((res) => res.data);
};

export const deleteComment = async (postId: string, commentId: string) => {
  return await instance
    .delete<string>(API_COMMENTS_UPDATE(postId, commentId))
    .then((res) => res.data);
};
