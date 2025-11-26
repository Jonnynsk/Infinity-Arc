import { observer } from "mobx-react-lite";
import clsx from "clsx";

import styles from "./styles/index.module.scss";

interface IProps {
  className?: string;
  name: string;
  aboutMe: string;
}

export const InfoMode = observer(
  ({ className = "", name = "", aboutMe = "" }: IProps) => {
    return (
      <div className={clsx(styles.infoMode, className)}>
        <div className={styles.infoMode__info}>
          <p className={styles.infoMode__label}>Name</p>
          <p className={styles.infoMode__value}>{name}</p>
        </div>
        <div className={styles.infoMode__info}>
          <p className={styles.infoMode__label}>About me</p>
          <p className={styles.infoMode__value}>{aboutMe || "-"}</p>
        </div>
      </div>
    );
  }
);
