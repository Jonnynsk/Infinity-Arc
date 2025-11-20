import { observer } from "mobx-react-lite";

import { Button } from "@/components/Button";
import { DeleteAccountModal } from "@/components/Modals/DeleteAccountModal";

import { useStoreAuthorization } from "@/stores/domains/authorization";

import styles from "./styles/index.module.scss";

export const DeleteAccount = observer(() => {
  const { openDeleteAccountModal } = useStoreAuthorization();

  return (
    <>
      <div className={styles.deleteAccount}>
        <div className={styles.deleteAccount__titleBlock}>
          <p className={styles.deleteAccount__title}>Delete Account</p>
          <p className={styles.deleteAccount__description}>
            Permanently delete your account and all data
          </p>
        </div>
        <Button
          title="Delete Account"
          onClick={openDeleteAccountModal}
          variant="danger"
        />
      </div>
      <DeleteAccountModal />
    </>
  );
});
