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
}

export const Button = ({
  title = "",
  variant = "primary",
  isBorderRadius = false,
  type = "button" as ButtonType,
  onClick = () => {},
  className = "",
}: IProps) => {
  return (
    <button
      type={type}
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
