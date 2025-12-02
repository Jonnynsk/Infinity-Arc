import {
  applySnapshot,
  flow,
  Instance,
  SnapshotIn,
  types,
} from "mobx-state-tree";
import { AxiosError } from "axios";

import { errorDev } from "@/helpers";

import { CommentModel } from "@/stores/models/Comment";
import { InputModel } from "@/stores/models/Input";
import { useStoreUsers } from "../users";
import { useStorePosts } from "../posts";

import {
  createComment,
  deleteComment,
  getComments,
  likeComment,
} from "@/api/requests/comments";

import {
  TCommentLikeResponse,
  TCommentResponse,
} from "@/api/requests/comments/types";

const StoreComments = types
  .model("StoreComments", {
    commentsByPostId: types.optional(types.map(types.array(CommentModel)), {}),
    isCommentsLoading: types.optional(types.boolean, false),
    isCreateCommentLoading: types.optional(types.boolean, false),
    isDeleteCommentLoading: types.optional(types.boolean, false),
    commentText: types.optional(InputModel, {}),
  })
  .actions((self) => {
    const setIsCommentsLoading = (value: boolean) => {
      self.isCommentsLoading = value;
    };

    const setIsCreateCommentLoading = (value: boolean) => {
      self.isCreateCommentLoading = value;
    };

    const setIsDeleteCommentLoading = (value: boolean) => {
      self.isDeleteCommentLoading = value;
    };

    const setComments = (
      postId: string,
      value: SnapshotIn<typeof CommentModel>[]
    ) => {
      self.commentsByPostId.set(postId, value);
    };

    const onCommentTextChange = (value: string) => {
      self.commentText.value = value;
    };

    const getAllComments = flow(function* (postId: string) {
      setIsCommentsLoading(true);

      try {
        const response: TCommentResponse[] = yield getComments(postId);

        if (response) {
          setComments(postId, response);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("getAllComments", error.response);
        }
      } finally {
        setIsCommentsLoading(false);
      }
    });

    const onCreateComment = flow(function* (postId: string) {
      const { updateCommentsCount } = useStoreUsers();
      const { incrementCommentsCount } = useStorePosts();
      const post = self.commentsByPostId.get(postId);

      if (!post) return;

      setIsCreateCommentLoading(true);

      try {
        const response: TCommentResponse = yield createComment(
          postId,
          self.commentText.value
        );

        if (response) {
          updateCommentsCount(true);
          incrementCommentsCount(postId);
          getAllComments(postId);
          self.commentText.clear();
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("onCreateComment", error.response);
        }
      } finally {
        setIsCreateCommentLoading(false);
      }
    });

    const onDeleteComment = flow(function* (postId: string, commentId: string) {
      const { decrementCommentsCount } = useStorePosts();

      setIsDeleteCommentLoading(true);

      try {
        const response: string = yield deleteComment(postId, commentId);

        if (response) {
          decrementCommentsCount(postId);
          getAllComments(postId);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("onDeleteComment", error.response);
        }
      } finally {
        setIsDeleteCommentLoading(false);
      }
    });

    const onLikeComment = flow(function* (postId: string, commentId: string) {
      const { updateLikesReceivedCount } = useStoreUsers();

      const comment = self.commentsByPostId
        .get(postId)
        ?.find((comment) => comment.id === commentId);

      if (!comment) return;

      comment.setIsLikeLoading(true);

      try {
        const response: TCommentLikeResponse = yield likeComment(
          postId,
          commentId
        );
        if (response) {
          comment.updateLike(response.liked, response.likesCount);
          updateLikesReceivedCount(response.liked);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("onLikeComment", error.response);
        }
      } finally {
        comment.setIsLikeLoading(false);
      }
    });

    return {
      getAllComments,
      onCreateComment,
      onDeleteComment,
      onCommentTextChange,
      onLikeComment,
    };
  })
  .views((self) => ({
    getCommentsByPostId(postId: string) {
      return self.commentsByPostId.get(postId) || [];
    },
    get inputCommentTextHandler() {
      return {
        value: self.commentText.value,
        onChange: self.onCommentTextChange,
        errors: self.commentText.errors,
        clear: self.commentText.clear,
      };
    },
    get isLoadingCreateCommentButton() {
      return self.isCreateCommentLoading || self.commentText.value.length === 0;
    },
  }));

interface IStoreComments extends Instance<typeof StoreComments> {}
interface IStoreCommentsSnapshotIn extends SnapshotIn<typeof StoreComments> {}

let store: IStoreComments;

function useStoreComments(snapshot?: IStoreCommentsSnapshotIn): IStoreComments {
  if (!store) {
    store = StoreComments.create();
  }

  if (snapshot) {
    applySnapshot(store, snapshot);
  }

  return store;
}

export { StoreComments, useStoreComments };
export type { IStoreComments, IStoreCommentsSnapshotIn };
