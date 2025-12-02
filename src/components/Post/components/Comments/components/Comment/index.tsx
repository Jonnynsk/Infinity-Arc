import Link from "next/link";

import { ButtonMenu } from "@/components/ButtonMenu";
import { ButtonIcon } from "../../../ButtonIcon";
import { Avatar } from "@/components/Avatar";

import { postDateFormat } from "@/helpers";
import { ROUTES } from "@/constants/routes";

import OptionsIcon from "@/public/icons/post/options.svg";
import DeleteIcon from "@/public/icons/post/delete.svg";
import ReportIcon from "@/public/icons/post/report.svg";
import LikeIcon from "@/public/icons/post/like.svg";

import styles from "./styles/index.module.scss";

interface IProps {
  avatar: string;
  username: string;
  content: string;
  date: string;
  onDelete: () => void;
  isDeleteCommentLoading: boolean;
  isMyPost: boolean;
  onLike: () => void;
  isLikeCommentLoading: boolean;
  isLiked: boolean;
  likesCount: number;
}

export const Comment = ({
  avatar = "",
  username = "",
  content = "",
  date = "",
  onDelete = () => {},
  isDeleteCommentLoading = false,
  isMyPost = false,
  onLike = () => {},
  isLikeCommentLoading = false,
  isLiked = false,
  likesCount = 0,
}: IProps) => {
  return (
    <div className={styles.comment}>
      <Avatar avatar={avatar} />
      <div className={styles.comment__wrapper}>
        <div className={styles.comment__header}>
          <Link
            href={isMyPost ? ROUTES.PROFILE : `/${username}`}
            className={styles.comment__username}
          >
            {username}
          </Link>
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
        <div className={styles.comment__actions}>
          <ButtonIcon
            icon={<LikeIcon className={isLiked ? styles.comment__liked : ""} />}
            onClick={onLike}
            text={likesCount?.toString() || "0"}
            title="Like"
            isLoading={isLikeCommentLoading}
          />
        </div>
      </div>
    </div>
  );
};
