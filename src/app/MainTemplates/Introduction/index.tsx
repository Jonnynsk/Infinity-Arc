import { Button } from "@/components/Button";

import styles from "./styles/index.module.scss";

export const Introduction = () => {
  return (
    <div className={styles.introduction}>
      <h1 className={styles.introduction__title}>Infinity Arc</h1>
      <p className={styles.introduction__subtitle}>Discipline year round</p>
      <p className={styles.introduction__description}>
        Eat. Train. Study. Work. Sleep. Repeat.
      </p>
      <div className={styles.introduction__buttons}>
        <Button title="Begin your journey" />
        <Button title="Learn more" variant="secondary" />
      </div>
    </div>
  );
};
