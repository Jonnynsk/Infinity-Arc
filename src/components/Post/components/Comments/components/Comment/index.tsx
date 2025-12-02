import Image from "next/image";

import { ButtonMenu } from "@/components/ButtonMenu";

import { postDateFormat } from "@/helpers";

import DefaultAvatar from "@/public/images/default-avatar.png";
import OptionsIcon from "@/public/icons/post/options.svg";
import DeleteIcon from "@/public/icons/post/delete.svg";
import ReportIcon from "@/public/icons/post/report.svg";

import styles from "./styles/index.module.scss";

interface IProps {
  avatar: string;
  username: string;
  content: string;
  date: string;
  onDelete: () => void;
  isDeleteCommentLoading: boolean;
  isMyPost: boolean;
}

export const Comment = ({
  avatar = "",
  username = "",
  content = "",
  date = "",
  onDelete = () => {},
  isDeleteCommentLoading = false,
  isMyPost = false,
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
          <ButtonMenu
            trigger={<OptionsIcon />}
            options={
              isMyPost
                ? [
                    {
                      label: "Delete",
                      onClick: onDelete,
                      icon: <DeleteIcon />,
                      isLoading: isDeleteCommentLoading,
                      variant: "danger",
                    },
                  ]
                : [
                    {
                      label: "Report comment",
                      onClick: () => {},
                      icon: <ReportIcon />,
                    },
                  ]
            }
            title="Options"
            className={styles.comment__options}
          />
        </div>
        <p className={styles.comment__content}>{content}</p>
      </div>
    </div>
  );
};
