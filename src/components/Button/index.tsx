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
  isUppercase?: boolean;
}

export const Button = ({
  title = "",
  variant = "primary",
  isBorderRadius = false,
  type = "button" as ButtonType,
  onClick = () => {},
  className = "",
  isLoading = false,
  isUppercase = false,
}: IProps) => {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styles[variant],
        isBorderRadius && styles.button_borderRadius,
        isLoading && styles.button_loading,
        isUppercase && styles.button_uppercase,
        className
      )}
      onClick={onClick}
      disabled={isLoading}
    >
      {title}
    </button>
  );
};
