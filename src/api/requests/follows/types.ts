import z from "zod";

export const FollowUserResponse = z.object({
  success: z.boolean(),
});
export type TFollowUserResponse = z.infer<typeof FollowUserResponse>;

export const FollowUsersResponse = z.object({
  total: z.number(),
  users: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      username: z.string(),
      avatar: z.string(),
      createdAt: z.string(),
    })
  ),
});
export type TFollowUsersResponse = z.infer<typeof FollowUsersResponse>;
