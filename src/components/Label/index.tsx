import clsx from "clsx";

import styles from "./styles/index.module.scss";

interface IProps {
  text: string;
  variant: "yellow" | "orange";
}

export const Label = ({ text = "", variant = "yellow" }: IProps) => {
  return <div className={clsx(styles.label, styles[variant])}>{text}</div>;
};
