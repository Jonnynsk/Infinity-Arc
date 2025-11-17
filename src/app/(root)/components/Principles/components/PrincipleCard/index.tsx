import styles from "./styles/index.module.scss";

interface IProps {
  id: number;
  title: string;
  description: string;
}

export const PrincipleCard = ({
  id = 0,
  title = "",
  description = "",
}: IProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <div className={styles.card__number}>{id}</div>
        <h3 className={styles.card__title}>{title}</h3>
      </div>
      <p className={styles.card__description}>{description}</p>
    </div>
  );
};
