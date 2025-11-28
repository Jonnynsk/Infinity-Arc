import {
  applySnapshot,
  flow,
  Instance,
  SnapshotIn,
  types,
} from "mobx-state-tree";
import { AxiosError } from "axios";

import { InputModel } from "@/stores/models/Input";
import { PostModel } from "@/stores/models/Post";

import { errorDev } from "@/helpers";

import { useStoreUsers } from "@/stores/domains/users";

import { createPost, deletePost, getPosts } from "@/api/requests/posts";

import { TPostResponse } from "@/api/requests/posts/types";

const StorePosts = types
  .model("StorePosts", {
    postText: types.optional(InputModel, {}),
    posts: types.optional(types.array(PostModel), []),
    isPostsLoading: types.optional(types.boolean, false),
    isCreatePostLoading: types.optional(types.boolean, false),
    isDeletePostLoading: types.optional(types.boolean, false),
  })
  .actions((self) => {
    const setIsPostsLoading = (value: boolean) => {
      self.isPostsLoading = value;
    };

    const setIsCreatePostLoading = (value: boolean) => {
      self.isCreatePostLoading = value;
    };

    const setIsDeletePostLoading = (value: boolean) => {
      self.isDeletePostLoading = value;
    };

    const setPosts = (value: SnapshotIn<typeof PostModel>[]) => {
      applySnapshot(self.posts, value);
    };

    const onPostTextChange = (value: string) => {
      self.postText.setValue(value);
    };

    const getAllPosts = flow(function* () {
      setIsPostsLoading(true);

      try {
        const response: TPostResponse[] = yield getPosts();

        if (response) {
          setPosts(response);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("getAllPosts", error.response);
        }
      } finally {
        setIsPostsLoading(false);
      }
    });

    const createNewPost = flow(function* () {
      setIsCreatePostLoading(true);

      const { getMyProfile } = useStoreUsers();

      try {
        const response: TPostResponse = yield createPost({
          content: self.postText.value,
          images: [],
        });

        if (response) {
          self.postText.clear();
          getAllPosts();
          getMyProfile();
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("createNewPost", error.response);
        }
      } finally {
        setIsCreatePostLoading(false);
      }
    });

    const deleteMyPost = flow(function* (postId: string) {
      setIsDeletePostLoading(true);

      try {
        const response = yield deletePost(postId);

        if (response) {
          getAllPosts();
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("deleteMyPost", error.response);
        }
      } finally {
        setIsDeletePostLoading(false);
      }
    });

    return {
      onPostTextChange,
      createNewPost,
      getAllPosts,
      deleteMyPost,
    };
  })
  .views((self) => {
    return {
      get inputPostTextHandler() {
        return {
          value: self.postText.value,
          onChange: self.onPostTextChange,
          errors: self.postText.errors,
          clear: self.postText.clear,
        };
      },
      get isLoadingCreatePostButton() {
        return self.isCreatePostLoading || self.postText.value.length === 0;
      },
      get getOnlyMyPosts() {
        const { myProfile } = useStoreUsers();
        return self.posts.filter(
          (post) => post.user.username === myProfile.username
        );
      },
      get getOnlyUserPosts() {
        const { userInfo } = useStoreUsers();
        return self.posts.filter(
          (post) => post.user.username === userInfo.username
        );
      },
    };
  });

interface IStorePosts extends Instance<typeof StorePosts> {}
interface IStorePostsSnapshotIn extends SnapshotIn<typeof StorePosts> {}

let store: IStorePosts;

function useStorePosts(snapshot?: IStorePostsSnapshotIn): IStorePosts {
  if (!store) {
    store = StorePosts.create();
  }

  if (snapshot) {
    applySnapshot(store, snapshot);
  }

  return store;
}

export { StorePosts, useStorePosts };
export type { IStorePosts, IStorePostsSnapshotIn };
