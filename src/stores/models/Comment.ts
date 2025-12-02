import { Instance, types } from "mobx-state-tree";

const CommentUserModel = types.model("CommentUserModel", {
  name: types.optional(types.string, ""),
  username: types.optional(types.string, ""),
  avatar: types.optional(types.string, ""),
});

const CommentModel = types
  .model("CommentModel", {
    id: types.optional(types.string, ""),
    user: types.optional(CommentUserModel, {}),
    content: types.optional(types.string, ""),
    likesCount: types.optional(types.number, 0),
    isLiked: types.optional(types.boolean, false),
    createdAt: types.optional(types.string, ""),
    updatedAt: types.optional(types.string, ""),
    isLikeLoading: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setIsLikeLoading(value: boolean) {
      self.isLikeLoading = value;
    },
    updateLike(liked: boolean, count: number) {
      self.isLiked = liked;
      self.likesCount = count;
    },
  }));

interface ICommentUserModel extends Instance<typeof CommentUserModel> {}
interface ICommentModel extends Instance<typeof CommentModel> {}

export type { ICommentUserModel, ICommentModel };
export { CommentUserModel, CommentModel };
