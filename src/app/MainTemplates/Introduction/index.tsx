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
      <div className={styles.section__buttons}>
        <Button title="Begin your journey" />
        <Button title="Learn more" variant="secondary" />
      </div>
    </section>
  );
};
