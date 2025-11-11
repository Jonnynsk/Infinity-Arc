import clsx from "clsx";

import { InfoCard } from "@/components/InfoCard";

import Train from "@/public/icons/cards/train.svg";
import Study from "@/public/icons/cards/study.svg";
import Work from "@/public/icons/cards/work.svg";
import Recover from "@/public/icons/cards/recover.svg";

import styles from "./styles/index.module.scss";

const CYCLE_CARDS = [
  {
    id: 0,
    title: "Train",
    description: "Build your body, forge your mind",
    icon: Train,
  },
  {
    id: 1,
    title: "Study",
    description: "Knowledge is power, learn daily",
    icon: Study,
  },
  {
    id: 2,
    title: "Work",
    description: "Execute with purpose",
    icon: Work,
  },
  {
    id: 3,
    title: "Recover",
    description: "Rest to rebuild, sleep to succeed",
    icon: Recover,
  },
];

interface IProps {
  className?: string;
}

export const CycleCards = ({ className = "" }: IProps) => {
  return (
    <section className={clsx(styles.section, className)}>
      <h2 className={styles.section__title}>The infinity cycle</h2>
      <p className={styles.section__description}>
        Discipline isn't seasonal. It's a way of life. Master the cycle, master
        yourself.
      </p>
      <div className={styles.section__cards}>
        {CYCLE_CARDS.map((card) => (
          <InfoCard key={card.id} {...card} />
        ))}
      </div>
    </section>
  );
};
