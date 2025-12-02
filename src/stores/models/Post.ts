import { Instance, types } from "mobx-state-tree";

export const PostUser = types.model("PostUser", {
  name: types.optional(types.string, ""),
  username: types.optional(types.string, ""),
  avatar: types.optional(types.string, ""),
});

export const PostImage = types.model("PostImage", {
  id: types.optional(types.string, ""),
  url: types.optional(types.string, ""),
});

const PostModel = types
  .model("PostModel", {
    id: types.optional(types.string, ""),
    user: types.optional(PostUser, {}),
    content: types.optional(types.string, ""),
    images: types.optional(types.array(PostImage), []),
    likesCount: types.optional(types.number, 0),
    commentsCount: types.optional(types.number, 0),
    repostsCount: types.optional(types.number, 0),
    isLiked: types.optional(types.boolean, false),
    isSaved: types.optional(types.boolean, false),
    isLikeLoading: types.optional(types.boolean, false),
    isSaveLoading: types.optional(types.boolean, false),
    createdAt: types.optional(types.string, ""),
    updatedAt: types.optional(types.string, ""),
  })
  .actions((self) => ({
    setIsLikeLoading(value: boolean) {
      self.isLikeLoading = value;
    },
    setIsSaveLoading(value: boolean) {
      self.isSaveLoading = value;
    },
    updateLike(liked: boolean, count: number) {
      self.isLiked = liked;
      self.likesCount = count;
    },
    updateSave(saved: boolean) {
      self.isSaved = saved;
    },
    incrementCommentsCount() {
      self.commentsCount += 1;
    },
    decrementCommentsCount() {
      self.commentsCount -= 1;
    },
  }));

interface IPostModel extends Instance<typeof PostModel> {}

export type { IPostModel };
export { PostModel };
