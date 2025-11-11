import styles from "./styles/index.module.scss";

export const Manifesto = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>Infinity Arc Manifesto</h2>
      <div className={styles.section__content}>
        <p className={styles.section__manifesto}>
          "We are the ones who rise before dawn while others sleep."
        </p>
        <p className={styles.section__manifesto}>
          "We are the ones who train when motivation fades."
        </p>
        <p className={styles.section__manifesto}>
          "We are the ones who choose discipline over comfort."
        </p>
        <p className={styles.section__manifesto}>
          "We are the ones who understand that excellence is not an act, but a
          habit."
        </p>
        <p className={styles.section__credo}>"We are Infinity."</p>
      </div>
    </section>
  );
};
