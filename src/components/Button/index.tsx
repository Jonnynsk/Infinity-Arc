"use client";

import clsx from "clsx";

import { ButtonType } from "@/constants";

import styles from "./styles/index.module.scss";

interface IProps {
  title: string;
  variant?: "primary" | "secondary";
  isBorderRadius?: boolean;
  type?: ButtonType;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
}

export const Button = ({
  title = "",
  variant = "primary",
  isBorderRadius = false,
  type = "button" as ButtonType,
  onClick = () => {},
  className = "",
  isLoading = false,
}: IProps) => {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styles[variant],
        isBorderRadius && styles.borderRadius,
        isLoading && styles.loading,
        className
      )}
      onClick={onClick}
      disabled={isLoading}
    >
      {title}
    </button>
  );
};
