import { Instance, types } from "mobx-state-tree";

const FollowUserModel = types.model("FollowUserModel", {
  id: types.optional(types.string, ""),
  name: types.optional(types.string, ""),
  username: types.optional(types.string, ""),
  avatar: types.optional(types.string, ""),
  createdAt: types.optional(types.string, ""),
});

const FollowsUserModel = types.model("FollowsUserModel", {
  total: types.optional(types.number, 0),
  users: types.optional(types.array(FollowUserModel), []),
});

interface IFollowUserModel extends Instance<typeof FollowUserModel> {}
interface IFollowsUserModel extends Instance<typeof FollowsUserModel> {}

export type { IFollowUserModel, IFollowsUserModel };
export { FollowUserModel, FollowsUserModel };
