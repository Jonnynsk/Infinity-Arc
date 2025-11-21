"use client";

import { observer } from "mobx-react-lite";
import { usePathname } from "next/navigation";

import { PAGE_CONTENT } from "@/constants/routes";

import { useStoreUsers } from "@/stores/domains/users";

import styles from "./styles/index.module.scss";

export const Header = observer(() => {
  const pathname = usePathname();
  const { myProfile } = useStoreUsers();

  const content = PAGE_CONTENT[pathname as keyof typeof PAGE_CONTENT];

  return (
    <div className={styles.header}>
      <div className={styles.header__titleBlock}>
        <p className={styles.header__title}>
          {content.title.replace("<name>", myProfile?.name || "")}
        </p>
        <p className={styles.header__description}>{content.description}</p>
      </div>
    </div>
  );
});
