import { Instance, types } from "mobx-state-tree";

const SocialNetwork = types.model("SocialNetwork", {
  id: types.optional(types.string, ""),
  title: types.optional(types.string, ""),
  link: types.optional(types.string, ""),
});

const ProfileModel = types.model("ProfileModel", {
  id: types.optional(types.string, ""),
  name: types.optional(types.string, ""),
  username: types.optional(types.string, ""),
  email: types.optional(types.string, ""),
  country: types.optional(types.string, ""),
  aboutMe: types.optional(types.string, ""),
  avatar: types.optional(types.string, ""),
  socialNetworks: types.optional(types.array(SocialNetwork), []),
  createdAt: types.optional(types.string, ""),
});

interface IProfileModel extends Instance<typeof ProfileModel> {}

export type { IProfileModel };
export { ProfileModel };
