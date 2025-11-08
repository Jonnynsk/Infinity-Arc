import clsx from "clsx";

import styles from "./styles/index.module.scss";

interface IProps {
  title: string;
  variant?: "primary" | "secondary";
  isBorderRadius?: boolean;
}

export const Button = ({
  title = "",
  variant = "primary",
  isBorderRadius = false,
}: IProps) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        isBorderRadius && styles.borderRadius
      )}
    >
      {title}
    </button>
  );
};
