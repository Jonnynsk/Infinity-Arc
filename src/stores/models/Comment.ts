import { Instance, types } from "mobx-state-tree";

const CommentUserModel = types.model("CommentUserModel", {
  name: types.optional(types.string, ""),
  username: types.optional(types.string, ""),
  avatar: types.optional(types.string, ""),
});

const CommentModel = types.model("CommentModel", {
  id: types.optional(types.string, ""),
  user: CommentUserModel,
  content: types.optional(types.string, ""),
  createdAt: types.optional(types.string, ""),
  updatedAt: types.optional(types.string, ""),
});

interface ICommentUserModel extends Instance<typeof CommentUserModel> {}
interface ICommentModel extends Instance<typeof CommentModel> {}

export type { ICommentUserModel, ICommentModel };
export { CommentUserModel, CommentModel };
