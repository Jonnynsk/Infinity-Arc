import Image from "next/image";

import OriginImage from "@/public/images/origin.png";

import styles from "./styles/index.module.scss";

export const Origin = () => {
  return (
    <section className={styles.section}>
      <Image src={OriginImage} alt="Origin" width={608} height={600} />
      <div className={styles.section__content}>
        <h2 className={styles.section__title}>The Origin</h2>
        <p className={styles.section__subtitle}>
          Born from the realization that seasonal motivation fails when life
          gets hard.
        </p>
        <p className={styles.section__description}>
          The Winter Arc trend inspired millions to transform their lives during
          the cold months. But what happens when spring arrives? When summer
          heat tests your resolve? When autumn brings new challenges?
        </p>
        <p className={styles.section__description}>
          Infinity Arc was created by individuals who understood that true
          champions don't take breaks. They don't wait for perfect conditions.
          They show up, day after day, season after season, year after year.
        </p>
        <p className={styles.section__description}>
          This is where seasonal warriors become infinity legends.
        </p>
      </div>
    </section>
  );
};
