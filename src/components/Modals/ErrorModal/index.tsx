import { observer } from "mobx-react-lite";
import Image from "next/image";

import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";

import IconWarning from "@/public/images/warning.png";

import styles from "./styles/index.module.scss";

interface IProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description?: string;
}

export const ErrorModal = observer(
  ({
    visible = false,
    onClose = () => {},
    title = "",
    description = "",
  }: IProps) => {
    return (
      <Modal visible={visible} onClose={onClose}>
        <div className={styles.errorModal}>
          <Image
            src={IconWarning.src}
            alt="Warning icon"
            width={80}
            height={80}
          />
          <h2 className={styles.errorModal__title}>{title}</h2>
          <p className={styles.errorModal__description}>{description}</p>
          <Button
            title="Continue"
            onClick={onClose}
            className={styles.errorModal__button}
          />
        </div>
      </Modal>
    );
  }
);
