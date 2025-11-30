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

import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "@/api/requests/comments";

import { TCommentResponse } from "@/api/requests/comments/types";

const StoreComments = types
  .model("StoreComments", {
    comments: types.optional(types.array(CommentModel), []),
    isCommentsLoading: types.optional(types.boolean, false),
    isCreateCommentLoading: types.optional(types.boolean, false),
    isUpdateCommentLoading: types.optional(types.boolean, false),
    isDeleteCommentLoading: types.optional(types.boolean, false),
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

    const setComments = (value: SnapshotIn<typeof CommentModel>[]) => {
      applySnapshot(self.comments, value);
    };

    const getAllComments = flow(function* (postId: string) {
      setIsCommentsLoading(true);

      try {
        const response: TCommentResponse[] = yield getComments(postId);

        if (response) {
          setComments(response);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("getAllComments", error.response);
        }
      } finally {
        setIsCommentsLoading(false);
      }
    });

    const onCreateComment = flow(function* (postId: string, content: string) {
      setIsCreateCommentLoading(true);

      try {
        const response: TCommentResponse = yield createComment(postId, content);

        if (response) {
          getAllComments(postId);
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
    };
  });

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
