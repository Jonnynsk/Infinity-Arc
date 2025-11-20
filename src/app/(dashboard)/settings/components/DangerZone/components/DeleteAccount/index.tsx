import { observer } from "mobx-react-lite";

import { Button } from "@/components/Button";

import styles from "./styles/index.module.scss";

export const DeleteAccount = observer(() => {
  return (
    <div className={styles.deleteAccount}>
      <div className={styles.deleteAccount__titleBlock}>
        <p className={styles.deleteAccount__title}>Delete Account</p>
        <p className={styles.deleteAccount__description}>
          Permanently delete your account and all data
        </p>
      </div>
      <Button title="Delete Account" onClick={() => {}} variant="danger" />
    </div>
  );
});
