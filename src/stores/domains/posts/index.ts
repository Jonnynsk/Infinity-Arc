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

import {
  createPost,
  deletePost,
  getPosts,
  getSavedPosts,
  likePost,
  savedPost,
} from "@/api/requests/posts";

import { TPostResponse } from "@/api/requests/posts/types";

const StorePosts = types
  .model("StorePosts", {
    postText: types.optional(InputModel, {}),
    posts: types.optional(types.array(PostModel), []),
    savedPosts: types.optional(types.array(PostModel), []),
    isPostsLoading: types.optional(types.boolean, false),
    isSavedPostsLoading: types.optional(types.boolean, false),
    isCreatePostLoading: types.optional(types.boolean, false),
    isDeletePostLoading: types.optional(types.boolean, false),
  })
  .actions((self) => {
    const setIsPostsLoading = (value: boolean) => {
      self.isPostsLoading = value;
    };

    const setIsSavedPostsLoading = (value: boolean) => {
      self.isSavedPostsLoading = value;
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

    const setSavedPosts = (value: SnapshotIn<typeof PostModel>[]) => {
      applySnapshot(self.savedPosts, value);
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

    const getAllSavedPosts = flow(function* () {
      setIsSavedPostsLoading(true);

      try {
        const response: TPostResponse[] = yield getSavedPosts();

        if (response) {
          setSavedPosts(response);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("getAllSavedPosts", error.response);
        }
      } finally {
        setIsSavedPostsLoading(false);
      }
    });

    const createNewPost = flow(function* () {
      setIsCreatePostLoading(true);

      const { updatePostsCount } = useStoreUsers();

      try {
        const response: TPostResponse = yield createPost({
          content: self.postText.value,
          images: [],
        });

        if (response) {
          self.postText.clear();
          getAllPosts();
          updatePostsCount(true);
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

    const toggleLikePost = flow(function* (postId: string) {
      const { updateLikesReceivedCount, myProfile } = useStoreUsers();
      const post = self.posts.find((post) => post.id === postId);

      if (!post) return;

      const isMyPost = post.user.username === myProfile.username;

      post.setIsLikeLoading(true);

      try {
        const response = yield likePost(postId);

        if (response) {
          post.updateLike(response.liked, response.likesCount);

          if (isMyPost) {
            updateLikesReceivedCount(response.liked);
          }
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("toggleLikePost", error.response);
        }
      } finally {
        post.setIsLikeLoading(false);
      }
    });

    const toggleSavePost = flow(function* (postId: string) {
      const post = self.posts.find((post) => post.id === postId);

      if (!post) return;

      post.setIsSaveLoading(true);

      try {
        const response = yield savedPost(postId);

        if (response) {
          post.updateSave(response.saved);
          getAllSavedPosts();
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("toggleSavePost", error.response);
        }
      } finally {
        post.setIsSaveLoading(false);
      }
    });

    const incrementCommentsCount = (postId: string) => {
      const post = self.posts.find((post) => post.id === postId);
      if (post) {
        post.incrementCommentsCount();
      }
    };

    const decrementCommentsCount = (postId: string) => {
      const post = self.posts.find((post) => post.id === postId);
      if (post) {
        post.decrementCommentsCount();
      }
    };

    return {
      onPostTextChange,
      createNewPost,
      getAllPosts,
      getAllSavedPosts,
      deleteMyPost,
      toggleLikePost,
      toggleSavePost,
      incrementCommentsCount,
      decrementCommentsCount,
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
