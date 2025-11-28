import z from "zod";

const SocialNetwork = z.object({
  id: z.string(),
  title: z.string(),
  link: z.string(),
});

const SocialStats = z.object({
  id: z.string(),
  title: z.string(),
  value: z.number(),
});

export const ProfileResponse = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  country: z.string(),
  aboutMe: z.string(),
  avatar: z.string().optional(),
  socialNetworks: z.array(SocialNetwork),
  socialStats: z.array(SocialStats),
  createdAt: z.string(),
});
export type TProfileResponse = z.infer<typeof ProfileResponse>;

export const ProfileRequest = z.object({
  name: z.string().optional(),
  aboutMe: z.string().optional(),
  socialNetworks: z.array(SocialNetwork).optional(),
});
export type TProfileRequest = z.infer<typeof ProfileRequest>;

export const UploadAvatarResponse = z.object({
  url: z.string(),
});
export type TUploadAvatarResponse = z.infer<typeof UploadAvatarResponse>;
