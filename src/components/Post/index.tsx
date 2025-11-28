import Image from "next/image";
import Link from "next/link";

import { ButtonMenu } from "../ButtonMenu";
import { PostActions } from "./components/PostActions";

import { postDateFormat } from "@/helpers";
import { ROUTES } from "@/constants/routes";

import DefaultAvatar from "@/public/images/default-avatar.png";
import OptionsIcon from "@/public/icons/post/options.svg";
import DeleteIcon from "@/public/icons/post/delete.svg";
import ReportIcon from "@/public/icons/post/report.svg";
import FollowIcon from "@/public/icons/post/follow.svg";

import styles from "./styles/index.module.scss";

interface IProps {
  postId: string;
  content: string;
  name: string;
  username: string;
  date: string;
  avatar: string;
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  isMyPost: boolean;
  onDelete?: () => void;
  isDeletePostLoading?: boolean;
  isLiked: boolean;
  isLikeLoading: boolean;
  isSaveLoading: boolean;
  isSaved: boolean;
}

export const Post = ({
  postId = "",
  content = "",
  name = "",
  username = "",
  date = "",
  avatar = "",
  likesCount = 0,
  commentsCount = 0,
  repostsCount = 0,
  isMyPost = false,
  onDelete = () => {},
  isDeletePostLoading = false,
  isLiked = false,
  isLikeLoading = false,
  isSaveLoading = false,
  isSaved = false,
}: IProps) => {
  return (
    <div className={styles.post}>
      <div className={styles.post__header}>
        <Image
          src={avatar || DefaultAvatar}
          alt="avatar"
          width={48}
          height={48}
          className={styles.post__avatar}
        />
        <Link
          href={isMyPost ? ROUTES.PROFILE : `/${username}`}
          className={styles.post__userInfo}
        >
          <p className={styles.post__name}>{name}</p>
          <p className={styles.post__details}>
            @{username} • {postDateFormat(date)}
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
                    label: `Follow @${username}`,
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
      <p className={styles.post__text}>{content}</p>
      <PostActions
        likesCount={likesCount}
        commentsCount={commentsCount}
        repostsCount={repostsCount}
        postId={postId}
        isLiked={isLiked}
        isLikeLoading={isLikeLoading}
        isSaveLoading={isSaveLoading}
        isSaved={isSaved}
        className={styles.post__actions}
      />
    </div>
  );
};
