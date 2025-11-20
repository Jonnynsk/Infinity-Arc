import { observer } from "mobx-react-lite";
import Image from "next/image";

import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";

import IconSuccess from "@/public/images/success.png";

import styles from "./styles/index.module.scss";

interface IProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description?: string;
}

export const SuccessModal = observer(
  ({
    visible = false,
    onClose = () => {},
    title = "",
    description = "",
  }: IProps) => {
    return (
      <Modal visible={visible} onClose={onClose}>
        <div className={styles.successModal}>
          <Image src={IconSuccess.src} alt="Success icon" width={80} height={80} />
          <h2 className={styles.successModal__title}>{title}</h2>
          <p className={styles.successModal__description}>{description}</p>
          <Button
            title="Continue"
            onClick={onClose}
            className={styles.successModal__button}
          />
        </div>
      </Modal>
    );
  }
);
