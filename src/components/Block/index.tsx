import clsx from "clsx";

import styles from "./styles/index.module.scss";

interface IProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export const Block = ({
  children,
  className = "",
  title = "",
  description = "",
}: IProps) => {
  return (
    <div className={clsx(styles.block, className)}>
      <div className={styles.block__header}>
        <h2 className={styles.block__title}>{title}</h2>
        <p className={styles.block__description}>{description}</p>
      </div>
      {children}
    </div>
  );
};
