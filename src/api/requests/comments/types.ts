import z from "zod";

export const CommentUserResponse = z.object({
  name: z.string(),
  username: z.string(),
  avatar: z.string(),
});
export type TCommentUserResponse = z.infer<typeof CommentUserResponse>;

export const CommentResponse = z.object({
  id: z.string(),
  user: CommentUserResponse,
  content: z.string(),
  likesCount: z.number(),
  isLiked: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type TCommentResponse = z.infer<typeof CommentResponse>;
