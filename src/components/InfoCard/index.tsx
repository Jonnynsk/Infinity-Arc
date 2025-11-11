import Image from "next/image";

import styles from "./styles/index.module.scss";

interface IProps {
  title: string;
  description: string;
  icon: string;
}

export const InfoCard = ({
  title = "",
  description = "",
  icon = "",
}: IProps) => {
  return (
    <div className={styles.infoCard}>
      <Image
        src={icon}
        alt={title}
        className={styles.infoCard__icon}
        width={60}
        height={48}
      />
      <div className={styles.infoCard__content}>
        <p className={styles.infoCard__title}>{title}</p>
        <p className={styles.infoCard__description}>{description}</p>
      </div>
    </div>
  );
};
