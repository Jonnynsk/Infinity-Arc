import { Instance, types } from "mobx-state-tree";

const FollowUserModel = types.model("FollowUserModel", {
  id: types.optional(types.string, ""),
  name: types.optional(types.string, ""),
  username: types.optional(types.string, ""),
  avatar: types.optional(types.string, ""),
  createdAt: types.optional(types.string, ""),
});

interface IFollowUserModel extends Instance<typeof FollowUserModel> {}

export type { IFollowUserModel };
export { FollowUserModel };
