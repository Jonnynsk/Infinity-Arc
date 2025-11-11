import { Introduction } from "./MainTemplates/Introduction";
import { CycleCards } from "./MainTemplates/InfoCards";
import { YouVsYou } from "./MainTemplates/YouVsYou";
import { Origin } from "./MainTemplates/Origin";
import { Philosophy } from "./MainTemplates/Philosophy";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.page__main}>
        <Introduction />
        <CycleCards className={styles.page__infoCards} />
        <YouVsYou />
        <Origin />
        <Philosophy />
      </main>
    </div>
  );
}
