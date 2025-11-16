import z from "zod";

export const ProfileResponse = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  country: z.string(),
  createdAt: z.string(),
});
export type TProfileResponse = z.infer<typeof ProfileResponse>;
