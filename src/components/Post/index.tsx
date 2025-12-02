"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { ButtonMenu } from "../ButtonMenu";
import { PostActions } from "./components/PostActions";
import { Comments } from "./components/Comments";

import { postDateFormat } from "@/helpers";
import { ROUTES } from "@/constants/routes";

import DefaultAvatar from "@/public/images/default-avatar.png";
import OptionsIcon from "@/public/icons/post/options.svg";
import DeleteIcon from "@/public/icons/post/delete.svg";
import ReportIcon from "@/public/icons/post/report.svg";
import FollowIcon from "@/public/icons/post/follow.svg";

import { useStoreComments } from "@/stores/domains/comments";
import { IPostModel } from "@/stores/models/Post";

import styles from "./styles/index.module.scss";

interface IProps {
  post: IPostModel;
  isMyPost: boolean;
  onDelete?: () => void;
  isDeletePostLoading?: boolean;
}

export const Post = observer(
  ({
    post,
    isMyPost = false,
    onDelete = () => {},
    isDeletePostLoading = false,
  }: IProps) => {
    const { getCommentsByPostId, getAllComments } = useStoreComments();
    const [isCommentOpen, setIsCommentOpen] = useState(false);

    useEffect(() => {
      if (isCommentOpen) {
        getAllComments(post.id);
      }
    }, [isCommentOpen, post.id]);

    const comments = getCommentsByPostId(post.id);

    return (
      <div className={styles.post}>
        <div
          className={clsx(
            styles.post__main,
            isCommentOpen && styles.post__main_commentOpen
          )}
        >
          <div className={styles.post__header}>
            <Image
              src={post.user.avatar || DefaultAvatar}
              alt="avatar"
              width={48}
              height={48}
              className={styles.post__avatar}
            />
            <Link
              href={isMyPost ? ROUTES.PROFILE : `/${post.user.username}`}
              className={styles.post__userInfo}
            >
              <p className={styles.post__name}>{post.user.name}</p>
              <p className={styles.post__details}>
                @{post.user.username} • {postDateFormat(post.createdAt)}
              </p>
            </Link>
            <ButtonMenu
              trigger={<OptionsIcon />}
              options={
                isMyPost
                  ? [
                      {
                        label: "Delete",
                        onClick: onDelete,
                        icon: <DeleteIcon />,
                        isLoading: isDeletePostLoading,
                        variant: "danger",
                      },
                    ]
                  : [
                      {
                        label: `Follow @${post.user.username}`,
                        onClick: () => {},
                        icon: <FollowIcon />,
                      },
                      {
                        label: "Report post",
                        onClick: () => {},
                        icon: <ReportIcon />,
                      },
                    ]
              }
              title="Options"
              className={styles.post__options}
            />
          </div>
          <p className={styles.post__text}>{post.content}</p>
          <PostActions
            likesCount={post.likesCount}
            commentsCount={post.commentsCount}
            repostsCount={post.repostsCount}
            postId={post.id}
            isLiked={post.isLiked}
            isLikeLoading={post.isLikeLoading}
            isSaveLoading={post.isSaveLoading}
            isSaved={post.isSaved}
            onToggleComment={() => setIsCommentOpen(!isCommentOpen)}
            className={styles.post__actions}
          />
        </div>
        {isCommentOpen && (
          <Comments
            commentsCount={post.commentsCount}
            comments={comments}
            postId={post.id}
          />
        )}
      </div>
    );
  }
);
