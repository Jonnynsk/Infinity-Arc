import { observer } from "mobx-react-lite";

import { Comment } from "./components/Comment";
import { CreateComment } from "./components/CreateComment";

import { ICommentModel } from "@/stores/models/Comment";
import { useStoreComments } from "@/stores/domains/comments";
import { useStoreUsers } from "@/stores/domains/users";

import styles from "./styles/index.module.scss";

interface IProps {
  commentsCount: number;
  comments: ICommentModel[];
  postId: string;
}

export const Comments = observer(
  ({ commentsCount = 0, comments = [], postId = "" }: IProps) => {
    const { onDeleteComment, isDeleteCommentLoading, onLikeComment } =
      useStoreComments();
    const { myProfile } = useStoreUsers();

    return (
      <div className={styles.comments}>
        {Boolean(commentsCount) && (
          <p className={styles.comments__counts}>Comments ({commentsCount})</p>
        )}
        <CreateComment
          className={styles.comments__createComment}
          postId={postId}
        />
        {Boolean(comments.length) && (
          <div className={styles.comments__list}>
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                avatar={comment.user.avatar}
                username={comment.user.username}
                content={comment.content}
                date={comment.createdAt}
                onDelete={() => onDeleteComment(postId, comment.id)}
                isDeleteCommentLoading={isDeleteCommentLoading}
                isMyPost={myProfile?.username === comment.user.username}
                onLike={() => onLikeComment(postId, comment.id)}
                isLikeCommentLoading={comment.isLikeLoading}
                isLiked={comment.isLiked}
                likesCount={comment.likesCount}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);
