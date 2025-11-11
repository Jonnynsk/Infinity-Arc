import { Introduction } from "./MainTemplates/Introduction";
import { InfoCards } from "./MainTemplates/InfoCards";
import { YouVsYou } from "./MainTemplates/YouVsYou";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.page__main}>
        <Introduction />
        <InfoCards className={styles.page__infoCards} />
        <YouVsYou />
      </main>
    </div>
  );
}
