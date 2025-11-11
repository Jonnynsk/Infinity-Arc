import { PrincipleCard } from "./components/PrincipleCard";

import styles from "./styles/index.module.scss";

const PRINCIPLES_CARDS = [
  {
    id: 1,
    title: "Consistency over intensity",
    description: `Small daily actions compound into extraordinary results. Show up every 
    day, even when you don't feel like it.`,
  },
  {
    id: 2,
    title: "Embrace discomfort",
    description: `Growth lives outside your comfort zone. Seek challenges that push your
    limits and expand your capabilities.`,
  },
  {
    id: 3,
    title: "Track everything",
    description: `What gets measured gets managed. Monitor your progress, celebrate 
    wins, and learn from setbacks.`,
  },
  {
    id: 4,
    title: "No excuses allowed",
    description: `Excuses are the enemy of excellence. Take full responsibility for your
    actions and outcomes.`,
  },
];

export const Principles = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>Core principles</h2>
      <div className={styles.section__cards}>
        {PRINCIPLES_CARDS.map((card) => (
          <PrincipleCard key={card.id} {...card} />
        ))}
      </div>
    </section>
  );
};
