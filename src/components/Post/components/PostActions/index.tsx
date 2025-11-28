import { observer } from "mobx-react-lite";
import clsx from "clsx";

import { ButtonIcon } from "../ButtonIcon";

import LikeIcon from "@/public/icons/post/like.svg";
import CommentIcon from "@/public/icons/post/comment.svg";
import RepostIcon from "@/public/icons/post/repost.svg";
import BookmarkIcon from "@/public/icons/post/bookmark.svg";

import { useStorePosts } from "@/stores/domains/posts";

import styles from "./styles/index.module.scss";

interface IProps {
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  postId: string;
  isLiked: boolean;
  isLikeLoading: boolean;
  className?: string;
}

export const PostActions = observer(
  ({
    likesCount = 0,
    commentsCount = 0,
    repostsCount = 0,
    className = "",
    postId = "",
    isLiked = false,
    isLikeLoading = false,
  }: IProps) => {
    const { toggleLikePost } = useStorePosts();

    return (
      <div className={clsx(styles.postActions, className)}>
        <div className={styles.postActions__left}>
          <ButtonIcon
            icon={
              <LikeIcon className={isLiked ? styles.postActions__liked : ""} />
            }
            onClick={() => toggleLikePost(postId)}
            text={likesCount.toString()}
            title="Like"
            isLoading={isLikeLoading}
          />
          <ButtonIcon
            icon={<CommentIcon />}
            onClick={() => {}}
            text={commentsCount.toString()}
            title="Reply"
          />
          <ButtonIcon
            icon={<RepostIcon />}
            onClick={() => {}}
            text={repostsCount.toString()}
            title="Repost"
          />
        </div>
        <ButtonIcon
          icon={<BookmarkIcon />}
          onClick={() => {}}
          title="Bookmark"
        />
      </div>
    );
  }
);
