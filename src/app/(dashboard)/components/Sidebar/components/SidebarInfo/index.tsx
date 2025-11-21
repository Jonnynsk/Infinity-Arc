import { observer } from "mobx-react-lite";
import Image from "next/image";
import clsx from "clsx";

import Avatar from "@/public/images/avatar.jpg";

import { useStoreUsers } from "@/stores/domains/users";

import styles from "./styles/index.module.scss";

interface IProps {
  className?: string;
}

export const SidebarInfo = observer(({ className = "" }: IProps) => {
  const { myProfile } = useStoreUsers();

  return (
    <div className={clsx(styles.sidebarInfo, className)}>
      <div className={styles.sidebarInfo__avatar}>
        <Image src={Avatar} alt={myProfile?.username} width={48} height={48} />
      </div>
      <div>
        <p className={styles.sidebarInfo__username}>{myProfile?.username}</p>
        <p className={styles.sidebarInfo__details}>Day 127 streak</p>
      </div>
    </div>
  );
});
