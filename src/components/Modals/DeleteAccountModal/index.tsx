import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";

import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import { ROUTES } from "@/constants/routes";

import DeleteIcon from "@/public/icons/delete.svg";

import { useStoreAuthorization } from "@/stores/domains/authorization";

import styles from "./styles/index.module.scss";

export const DeleteAccountModal = observer(() => {
  const router = useRouter();
  const {
    authDeleteAccount,
    isDeleteAccountLoading,
    isDeleteAccountModalOpen,
    closeDeleteAccountModal,
    inputDeleteAccountConfirmHandler,
    isDeleteAccountConfirmed,
  } = useStoreAuthorization();

  const handleDeleteAccount = () => {
    authDeleteAccount().then(() => {
      router.push(ROUTES.HOME);
    });
  };

  return (
    <Modal
      visible={isDeleteAccountModalOpen}
      onClose={closeDeleteAccountModal}
      classNameContent={styles.deleteAccountModal__content}
    >
      <div className={styles.deleteAccountModal}>
        <div className={styles.deleteAccountModal__header}>
          <div className={styles.deleteAccountModal__deleteIcon}>
            <DeleteIcon />
          </div>
          <div>
            <h2 className={styles.deleteAccountModal__title}>
              Are you sure you want to delete your account?
            </h2>
            <p className={styles.deleteAccountModal__description}>
              This action is irreversible.
            </p>
            <p className={styles.deleteAccountModal__description}>
              Account recovery will be impossible.
            </p>
          </div>
        </div>
        <Input
          label={`To confirm, type "DELETE"`}
          type="email"
          placeholder="Enter DELETE"
          value={inputDeleteAccountConfirmHandler.value}
          onChange={inputDeleteAccountConfirmHandler.onChange}
          error={inputDeleteAccountConfirmHandler.errors[0]}
          className={styles.deleteAccountModal__input}
          reserveErrorSpace={false}
        />
        <div className={styles.deleteAccountModal__buttons}>
          <Button
            title="Cancel"
            onClick={closeDeleteAccountModal}
            className={styles.deleteAccountModal__button}
          />
          <Button
            title="Delete Account"
            onClick={handleDeleteAccount}
            className={styles.deleteAccountModal__button}
            variant="danger"
            isLoading={isDeleteAccountLoading || !isDeleteAccountConfirmed}
          />
        </div>
      </div>
    </Modal>
  );
});
