import clsx from "clsx";

import styles from "./styles/index.module.scss";

interface IProps {
  title: string;
  className?: string;
}

export const Error = ({ title = "", className = "" }: IProps) => {
  return <span className={clsx(styles.error, className)}>{title}</span>;
};
