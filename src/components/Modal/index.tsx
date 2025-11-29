import { ReactNode } from "react";
import clsx from "clsx";

import { Portal } from "./Portal";

import CloseModalIcon from "@/public/icons/closeModal.svg";

import styles from "./styles/index.module.scss";

interface IProps {
  visible: boolean;
  children: ReactNode;
  onClose(): void;
  className?: string;
  classNameContent?: string;
  isBlack?: boolean;
  isCloseIcon?: boolean;
}

export const Modal = ({
  visible = false,
  children = null,
  onClose = () => {},
  className = "",
  classNameContent = "",
  isBlack = false,
  isCloseIcon = false,
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
          className={clsx(styles.modal__content, classNameContent, {
            [styles.modal__content_black]: isBlack,
          })}
        >
          {isCloseIcon && (
            <CloseModalIcon
              className={styles.modal__closeIcon}
              onClick={onClose}
            />
          )}
          {children}
        </div>
      </div>
    </Portal>
  );
};
