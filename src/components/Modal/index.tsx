import { ReactNode } from "react";
import clsx from "clsx";

import { Portal } from "./Portal";

import styles from "./styles/index.module.scss";

interface IProps {
  visible: boolean;
  children: ReactNode;
  onClose(): void;
  className?: string;
}

export const Modal = ({
  visible = false,
  children = null,
  onClose = () => {},
  className = "",
}: IProps) => {
  if (!visible) return null;

  return (
    <Portal>
      <div className={clsx(styles.modal, className)} onClick={onClose}>
        <div
          className={styles.modal__content}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};
