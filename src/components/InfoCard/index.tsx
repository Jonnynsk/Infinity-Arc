import styles from "./styles/index.module.scss";

interface IProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const InfoCard = ({ title = "", description = "", icon }: IProps) => {
  return (
    <div className={styles.infoCard}>
      {icon}
      <div className={styles.infoCard__content}>
        <p className={styles.infoCard__title}>{title}</p>
        <p className={styles.infoCard__description}>{description}</p>
      </div>
    </div>
  );
};
