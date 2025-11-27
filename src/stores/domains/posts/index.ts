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

import { createPost, getPosts } from "@/api/requests/posts";

import { TPostResponse } from "@/api/requests/posts/types";

const StorePosts = types
  .model("StorePosts", {
    postText: types.optional(InputModel, {}),
    posts: types.optional(types.array(PostModel), []),
    isPostsLoading: types.optional(types.boolean, false),
    isCreatePostLoading: types.optional(types.boolean, false),
  })
  .actions((self) => {
    const setIsPostsLoading = (value: boolean) => {
      self.isPostsLoading = value;
    };

    const setIsCreatePostLoading = (value: boolean) => {
      self.isCreatePostLoading = value;
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

      try {
        const response: TPostResponse = yield createPost({
          content: self.postText.value,
          images: [],
        });

        if (response) {
          self.postText.clear();
          getAllPosts();
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("createNewPost", error.response);
        }
      } finally {
        setIsCreatePostLoading(false);
      }
    });

    return {
      onPostTextChange,
      createNewPost,
      getAllPosts,
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
