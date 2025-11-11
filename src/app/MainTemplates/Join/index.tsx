import { Button } from "@/components/Button";

import styles from "./styles/index.module.scss";

export const Join = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>Join Infinity Arc movement</h2>
      <p className={styles.section__description}>
        Ready to transcend seasonal motivation and embrace lifelong discipline?
      </p>
      <Button title="Start your arc" className={styles.section__button} />
    </section>
  );
};
