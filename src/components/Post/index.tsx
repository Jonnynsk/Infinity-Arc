import Image from "next/image";
import Link from "next/link";

import { ButtonIcon } from "./components/ButtonIcon";

import { postDateFormat } from "@/helpers";
import { ROUTES } from "@/constants/routes";

import DefaultAvatar from "@/public/images/default-avatar.png";
import LikeIcon from "@/public/icons/post/like.svg";
import CommentIcon from "@/public/icons/post/comment.svg";
import RepostIcon from "@/public/icons/post/repost.svg";
import BookmarkIcon from "@/public/icons/post/bookmark.svg";
import OptionsIcon from "@/public/icons/post/options.svg";

import styles from "./styles/index.module.scss";

interface IProps {
  content: string;
  name: string;
  username: string;
  date: string;
  avatar: string;
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  isMyPost: boolean;
}

export const Post = ({
  content = "",
  name = "",
  username = "",
  date = "",
  avatar = "",
  likesCount = 0,
  commentsCount = 0,
  repostsCount = 0,
  isMyPost = false,
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
        <ButtonIcon
          icon={<OptionsIcon />}
          onClick={() => {}}
          title="Options"
          className={styles.post__options}
        />
      </div>
      <p className={styles.post__text}>{content}</p>
      <div className={styles.post__actions}>
        <div className={styles.post__actionsLeft}>
          <ButtonIcon
            icon={<LikeIcon />}
            onClick={() => {}}
            text={likesCount.toString()}
            title="Like"
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
    </div>
  );
};
