import clsx from "clsx";

import styles from "./styles/index.module.scss";

interface IProps {
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
  text?: string;
  title?: string;
  isLoading?: boolean;
}

export const ButtonIcon = ({
  icon,
  onClick = () => {},
  className = "",
  text = "",
  title = "",
  isLoading = false,
}: IProps) => {
  return (
    <button
      className={clsx(
        styles.buttonIcon,
        className,
        isLoading && styles.buttonIcon_loading
      )}
      title={title}
      onClick={onClick}
      disabled={isLoading}
    >
      {icon}
      {text && <span className={styles.buttonIcon__text}>{text}</span>}
    </button>
  );
};
