import { observer } from "mobx-react-lite";

import { Block } from "@/components/Block";
import { DeleteAccount } from "./components/DeleteAccount";

import styles from "./styles/index.module.scss";

export const DangerZone = observer(() => {
  return (
    <Block
      title="Danger Zone"
      description="Irreversible actions - proceed with caution"
      className={styles.dangerZone}
    >
      <div className={styles.dangerZone__content}>
        <DeleteAccount />
      </div>
    </Block>
  );
});
