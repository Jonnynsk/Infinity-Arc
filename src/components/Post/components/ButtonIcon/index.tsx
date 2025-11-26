import clsx from "clsx";

import styles from "./styles/index.module.scss";

interface IProps {
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
  text?: string;
  title?: string;
}

export const ButtonIcon = ({
  icon,
  onClick = () => {},
  className = "",
  text = "",
  title = "",
}: IProps) => {
  return (
    <button
      className={clsx(styles.buttonIcon, className)}
      title={title}
      onClick={onClick}
    >
      {icon}
      {text && <span className={styles.buttonIcon__text}>{text}</span>}
    </button>
  );
};
