import Image from "next/image";

import { postDateFormat } from "@/helpers";

import DefaultAvatar from "@/public/images/default-avatar.png";

import styles from "./styles/index.module.scss";

interface IProps {
  avatar: string;
  username: string;
  content: string;
  date: string;
}

export const Comment = ({
  avatar = "",
  username = "",
  content = "",
  date = "",
}: IProps) => {
  return (
    <div className={styles.comment}>
      <Image
        src={avatar || DefaultAvatar}
        alt="avatar"
        width={40}
        height={40}
        className={styles.comment__avatar}
      />
      <div className={styles.comment__wrapper}>
        <div className={styles.comment__header}>
          <p className={styles.comment__username}>{username}</p>
          <p className={styles.comment__date}>{postDateFormat(date)}</p>
        </div>
        <p className={styles.comment__content}>{content}</p>
      </div>
    </div>
  );
};
