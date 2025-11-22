import { observer } from "mobx-react-lite";
import Image from "next/image";

import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";

import IconWarning from "@/public/images/warning.png";

import styles from "./styles/index.module.scss";

interface IProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  isLoading?: boolean;
}

export const QuestionModal = observer(
  ({
    visible = false,
    onClose = () => {},
    onConfirm = () => {},
    title = "",
    description = "",
    isLoading = false,
  }: IProps) => {
    return (
      <Modal visible={visible} onClose={onClose}>
        <div className={styles.questionModal}>
          <div className={styles.questionModal__content}>
            <Image
              src={IconWarning.src}
              alt="Warning icon"
              width={80}
              height={80}
            />
            <h2 className={styles.questionModal__title}>{title}</h2>
            <p
              className={styles.questionModal__description}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
          <div className={styles.questionModal__buttons}>
            <Button
              title="Cancel"
              onClick={onClose}
              className={styles.questionModal__button}
              variant="secondary"
            />
            <Button
              title="Confirm"
              onClick={onConfirm}
              className={styles.questionModal__button}
              variant="danger"
              isLoading={isLoading}
            />
          </div>
        </div>
      </Modal>
    );
  }
);
