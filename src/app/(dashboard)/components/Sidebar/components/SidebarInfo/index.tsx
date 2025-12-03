import { observer } from "mobx-react-lite";
import clsx from "clsx";

import { Avatar } from "@/components/Avatar";

import { useStoreUsers } from "@/stores/domains/users";

import styles from "./styles/index.module.scss";

interface IProps {
  className?: string;
}

export const SidebarInfo = observer(({ className = "" }: IProps) => {
  const { myProfile, previewAvatar } = useStoreUsers();

  const avatarSrc = previewAvatar || myProfile.avatar;

  return (
    <div className={clsx(styles.sidebarInfo, className)}>
      <Avatar avatar={avatarSrc} width={48} height={48} />
      <div>
        <p className={styles.sidebarInfo__username}>{myProfile?.username}</p>
        <p className={styles.sidebarInfo__details}>
          Day {myProfile?.dayStreak} Streak
        </p>
      </div>
    </div>
  );
});
