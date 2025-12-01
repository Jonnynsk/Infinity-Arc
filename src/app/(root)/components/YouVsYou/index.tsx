import QuoteIcon from "@/public/icons/quote.svg";

import styles from "./styles/index.module.scss";

export const YouVsYou = () => {
  return (
    <section className={styles.section}>
      <div className={styles.section__content}>
        <QuoteIcon width={31} height={36} />
        <h2 className={styles.section__title}>You vs You</h2>
        <p className={styles.section__subtitle}>
          The only competition that matters
        </p>
        <p className={styles.section__description}>
          Every day is a battle against your former self. Discipline is choosing
          what you want most over what you want now. The infinity arc never
          ends—it only gets stronger.
        </p>
      </div>
    </section>
  );
};
