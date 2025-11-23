import { observer } from "mobx-react-lite";

import { useStoreUsers } from "@/stores/domains/users";

import styles from "./styles/index.module.scss";

export const InfoMode = observer(() => {
  const { myProfile } = useStoreUsers();

  return (
    <div className={styles.infoMode}>
      <div className={styles.infoMode__info}>
        <p className={styles.infoMode__label}>Name</p>
        <p className={styles.infoMode__value}>{myProfile.name}</p>
      </div>
      <div className={styles.infoMode__info}>
        <p className={styles.infoMode__label}>About me</p>
        <p className={styles.infoMode__value}>{myProfile.aboutMe || "-"}</p>
      </div>
    </div>
  );
});
