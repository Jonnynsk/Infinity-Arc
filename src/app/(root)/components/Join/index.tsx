import { observer } from "mobx-react-lite";

import { Button } from "@/components/Button";

import { useStoreAuthorization } from "@/stores/domains/authorization";

import styles from "./styles/index.module.scss";

export const Join = observer(() => {
  const { openAuthModal } = useStoreAuthorization();

  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>Join Infinity Arc movement</h2>
      <p className={styles.section__description}>
        Ready to transcend seasonal motivation and embrace lifelong discipline?
      </p>
      <Button
        title="Start your arc"
        className={styles.section__button}
        onClick={openAuthModal}
      />
    </section>
  );
});
