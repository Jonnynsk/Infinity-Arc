import { observer } from "mobx-react-lite";
import Image from "next/image";
import clsx from "clsx";

import DefaultAvatar from "@/public/images/default-avatar.png";

import { useStoreUsers } from "@/stores/domains/users";

import styles from "./styles/index.module.scss";

interface IProps {
  className?: string;
}

export const SidebarInfo = observer(({ className = "" }: IProps) => {
  const { myProfile, previewAvatar } = useStoreUsers();

  return (
    <div className={clsx(styles.sidebarInfo, className)}>
      <Image
        src={previewAvatar || myProfile.avatar || DefaultAvatar}
        alt={myProfile?.username}
        width={48}
        height={48}
        className={styles.sidebarInfo__avatar}
      />
      <div>
        <p className={styles.sidebarInfo__username}>{myProfile?.username}</p>
        <p className={styles.sidebarInfo__details}>Day 127 streak</p>
      </div>
    </div>
  );
});
