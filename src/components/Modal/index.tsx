import { ReactNode } from "react";
import clsx from "clsx";

import { Portal } from "./Portal";

import styles from "./styles/index.module.scss";

interface IProps {
  visible: boolean;
  children: ReactNode;
  onClose(): void;
  className?: string;
  isBlack?: boolean;
}

export const Modal = ({
  visible = false,
  children = null,
  onClose = () => {},
  className = "",
  isBlack = false,
}: IProps) => {
  if (!visible) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Portal>
      <div
        className={clsx(styles.modal, className)}
        onMouseDown={handleOverlayClick}
      >
        <div
          className={clsx(styles.modal__content, {
            [styles.modal__content_black]: isBlack,
          })}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};
