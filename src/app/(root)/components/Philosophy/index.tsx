import { InfoCard } from "@/components/InfoCard";

import InfinityIcon from "@/public/icons/infinity.svg";
import BalanceIcon from "@/public/icons/balance.svg";
import CommunityIcon from "@/public/icons/community.svg";

import styles from "./styles/index.module.scss";

const PHILOSOPHY_CARDS = [
  {
    id: 0,
    title: "Infinite Mindset",
    description: `Discipline isn't a sprint or seasonal challenge. 
    It's a lifelong commitment to becoming the best version of yourself, 
    every single day, without exception.`,
    icon: InfinityIcon,
  },
  {
    id: 1,
    title: "Balanced Warrior",
    description: `True strength comes from mastering all aspects of life: 
    physical fitness, mental clarity, emotional control, and spiritual 
    growth in perfect harmony.`,
    icon: BalanceIcon,
  },
  {
    id: 2,
    title: "Community Force",
    description: `Surround yourself with like-minded warriors who push you to excel. 
    Together, we rise. Together, we conquer our limitations.`,
    icon: CommunityIcon,
  },
];

export const Philosophy = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>Infinity Arc Philosophy</h2>
      <div className={styles.section__cards}>
        {PHILOSOPHY_CARDS.map((card) => (
          <InfoCard
            key={card.id}
            title={card.title}
            description={card.description}
            icon={<card.icon />}
          />
        ))}
      </div>
    </section>
  );
};
