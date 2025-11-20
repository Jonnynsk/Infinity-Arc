import z from "zod";

export const ProfileResponse = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  country: z.string(),
  aboutMe: z.string(),
  createdAt: z.string(),
});
export type TProfileResponse = z.infer<typeof ProfileResponse>;

const SocialNetwork = z.object({
  title: z.string(),
  link: z.string(),
});

export const ProfileRequest = z.object({
  name: z.string().optional(),
  aboutMe: z.string().optional(),
  country: z.string().optional(),
  socialNetworks: z.array(SocialNetwork).optional(),
});
export type TProfileRequest = z.infer<typeof ProfileRequest>;
