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

import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "@/api/requests/comments";

import { TCommentResponse } from "@/api/requests/comments/types";

const StoreComments = types
  .model("StoreComments", {
    commentsByPostId: types.optional(types.map(types.array(CommentModel)), {}),
    isCommentsLoading: types.optional(types.boolean, false),
    isCreateCommentLoading: types.optional(types.boolean, false),
    isUpdateCommentLoading: types.optional(types.boolean, false),
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

    const setIsUpdateCommentLoading = (value: boolean) => {
      self.isUpdateCommentLoading = value;
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
      setIsCreateCommentLoading(true);

      try {
        const response: TCommentResponse = yield createComment(
          postId,
          self.commentText.value
        );

        if (response) {
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

    const onUpdateComment = flow(function* (
      postId: string,
      commentId: string,
      content: string
    ) {
      setIsUpdateCommentLoading(true);

      try {
        const response: TCommentResponse = yield updateComment(
          postId,
          commentId,
          content
        );

        if (response) {
          getAllComments(postId);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("onUpdateComment", error.response);
        }
      } finally {
        setIsUpdateCommentLoading(false);
      }
    });

    const onDeleteComment = flow(function* (postId: string, commentId: string) {
      setIsDeleteCommentLoading(true);

      try {
        const response: string = yield deleteComment(postId, commentId);

        if (response) {
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

    return {
      getAllComments,
      onCreateComment,
      onUpdateComment,
      onDeleteComment,
      onCommentTextChange,
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
