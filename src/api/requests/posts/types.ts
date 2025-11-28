import z from "zod";

export const PostImage = z.object({
  id: z.string(),
  url: z.string(),
});
export type TPostImage = z.infer<typeof PostImage>;

export const PostUser = z.object({
  name: z.string(),
  username: z.string(),
  avatar: z.string().optional(),
});
export type TPostUser = z.infer<typeof PostUser>;

export const PostRequest = z.object({
  content: z.string(),
  images: z.array(PostImage),
});
export type TPostRequest = z.infer<typeof PostRequest>;

export const PostResponse = z.object({
  id: z.string(),
  user: PostUser,
  content: z.string(),
  images: z.array(PostImage),
  likesCount: z.number(),
  commentsCount: z.number(),
  repostsCount: z.number(),
  isLiked: z.boolean(),
  isSaved: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type TPostResponse = z.infer<typeof PostResponse>;

export const LikePostResponse = z.object({
  liked: z.boolean(),
  likesCount: z.number(),
});
export type TLikePostResponse = z.infer<typeof LikePostResponse>;

export const SavedPostResponse = z.object({
  saved: z.boolean(),
});
export type TSavedPostResponse = z.infer<typeof SavedPostResponse>;
