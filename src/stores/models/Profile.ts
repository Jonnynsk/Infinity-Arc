import { Instance, types } from "mobx-state-tree";

const ProfileModel = types.model("ProfileModel", {
  id: types.optional(types.string, ""),
  name: types.optional(types.string, ""),
  username: types.optional(types.string, ""),
  email: types.optional(types.string, ""),
  country: types.optional(types.string, ""),
  createdAt: types.optional(types.string, ""),
});

interface IProfileModel extends Instance<typeof ProfileModel> {}

export type { IProfileModel };
export { ProfileModel };
