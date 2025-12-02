import Link from "next/link";

import { Avatar } from "@/components/Avatar";

import { IFollowUserModel } from "@/stores/models/Follow";

import styles from "./styles/index.module.scss";

interface IProps {
  user: IFollowUserModel;
  onClose: () => void;
}

export const FollowUser = ({
  user = {} as IFollowUserModel,
  onClose = () => {},
}: IProps) => {
  return (
    <div className={styles.followUser}>
      <Link
        href={`${user.username}`}
        className={styles.followUser__content}
        onClick={onClose}
      >
        <Avatar avatar={user.avatar} />
        <div className={styles.followUser__info}>
          <p className={styles.followUser__username}>{user.username}</p>
          <p className={styles.followUser__name}>{user.name}</p>
        </div>
      </Link>
    </div>
  );
};
