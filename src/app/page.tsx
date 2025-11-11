import { Introduction } from "./MainTemplates/Introduction";
import { Cycle } from "./MainTemplates/Cycle";
import { YouVsYou } from "./MainTemplates/YouVsYou";
import { Origin } from "./MainTemplates/Origin";
import { Philosophy } from "./MainTemplates/Philosophy";
import { Principles } from "./MainTemplates/Principles";
import { Manifesto } from "./MainTemplates/Manifesto";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.page__main}>
        <Introduction />
        <Cycle className={styles.page__cycle} />
        <YouVsYou />
        <Origin />
        <Philosophy />
        <Manifesto />
        <Principles />
      </main>
    </div>
  );
}
