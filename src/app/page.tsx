import { Introduction } from "./MainTemplates/Introduction";
import { InfoCards } from "./MainTemplates/InfoCards";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.page__main}>
        <Introduction />
        <InfoCards className={styles.page__infoCards} />
      </main>
    </div>
  );
}
