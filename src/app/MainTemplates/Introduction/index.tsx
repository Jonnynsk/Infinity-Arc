import { Button } from "@/components/Button";

import styles from "./styles/index.module.scss";

export const Introduction = () => {
  return (
    <section className={styles.section}>
      <h1 className={styles.section__title}>Infinity Arc</h1>
      <p className={styles.section__subtitle}>Discipline year round</p>
      <p className={styles.section__description}>
        Eat. Train. Study. Work. Sleep. Repeat.
      </p>
      <Button title="Begin your journey" className={styles.section__button} />
    </section>
  );
};
