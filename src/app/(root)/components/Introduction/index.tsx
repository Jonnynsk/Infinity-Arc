import { observer } from "mobx-react-lite";

import { Button } from "@/components/Button";

import { useStoreAuthorization } from "@/stores/domains/authorization";

import styles from "./styles/index.module.scss";

export const Introduction = observer(() => {
  const { openAuthModal } = useStoreAuthorization();

  return (
    <section className={styles.section}>
      <h1 className={styles.section__title}>Infinity Arc</h1>
      <p className={styles.section__subtitle}>Discipline year round</p>
      <p className={styles.section__description}>
        Eat. Train. Study. Work. Sleep. Repeat.
      </p>
      <Button
        title="Begin your journey"
        className={styles.section__button}
        onClick={openAuthModal}
        isUppercase
      />
    </section>
  );
});
