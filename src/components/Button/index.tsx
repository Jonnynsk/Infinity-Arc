"use client";

import clsx from "clsx";

import styles from "./styles/index.module.scss";

interface IProps {
  title: string;
  variant?: "primary" | "secondary";
  isBorderRadius?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Button = ({
  title = "",
  variant = "primary",
  isBorderRadius = false,
  onClick = () => {},
  className = "",
}: IProps) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        isBorderRadius && styles.borderRadius,
        className
      )}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
