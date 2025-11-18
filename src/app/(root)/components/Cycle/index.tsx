import clsx from "clsx";

import { InfoCard } from "@/components/InfoCard";

import TrainIcon from "@/public/icons/cards/train.svg";
import StudyIcon from "@/public/icons/cards/study.svg";
import WorkIcon from "@/public/icons/cards/work.svg";
import RecoverIcon from "@/public/icons/cards/recover.svg";

import styles from "./styles/index.module.scss";

const CYCLE_CARDS = [
  {
    id: 0,
    title: "Train",
    description: "Build your body, forge your mind",
    icon: TrainIcon,
  },
  {
    id: 1,
    title: "Study",
    description: "Knowledge is power, learn daily",
    icon: StudyIcon,
  },
  {
    id: 2,
    title: "Work",
    description: "Execute with purpose",
    icon: WorkIcon,
  },
  {
    id: 3,
    title: "Recover",
    description: "Rest to rebuild, sleep to succeed",
    icon: RecoverIcon,
  },
];

interface IProps {
  className?: string;
}

export const Cycle = ({ className = "" }: IProps) => {
  return (
    <section className={clsx(styles.section, className)}>
      <h2 className={styles.section__title}>The infinity cycle</h2>
      <p className={styles.section__description}>
        Discipline isn't seasonal. It's a way of life. Master the cycle, master
        yourself.
      </p>
      <div className={styles.section__cards}>
        {CYCLE_CARDS.map((card) => (
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
