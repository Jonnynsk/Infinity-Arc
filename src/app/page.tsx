import { InfoCard } from "@/components/InfoCard";

import Train from "@/public/icons/cards/train.svg";
import Study from "@/public/icons/cards/study.svg";
import Work from "@/public/icons/cards/work.svg";
import Recover from "@/public/icons/cards/recover.svg";

import styles from "./page.module.scss";

const INFO_CARDS = [
  {
    title: "Train",
    description: "Build your body, forge your mind",
    icon: Train,
  },
  {
    title: "Study",
    description: "Knowledge is power, learn daily",
    icon: Study,
  },
  {
    title: "Work",
    description: "Execute with purpose",
    icon: Work,
  },
  {
    title: "Recover",
    description: "Rest to rebuild, sleep to succeed",
    icon: Recover,
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.page__main}>
        <div className={styles.page__infoCards}>
          {INFO_CARDS.map((card) => (
            <InfoCard key={card.title} {...card} />
          ))}
        </div>
      </main>
    </div>
  );
}
