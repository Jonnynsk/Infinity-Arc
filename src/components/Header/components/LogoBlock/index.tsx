import Link from "next/link";
import clsx from "clsx";

import { ROUTES } from "@/constants/routes";

import LogoIcon from "@/public/icons/logo.svg";

import styles from "./styles/index.module.scss";

interface IProps {
  className?: string;
}

export const LogoBlock = ({ className = "" }: IProps) => {
  return (
    <Link href={ROUTES.HOME} className={clsx(styles.logoBlock, className)}>
      <LogoIcon width={38} height={30} />
      <span className={styles.logoBlock__title}>Infinity Arc</span>
    </Link>
  );
};
