import { observer } from "mobx-react-lite";

import { Block } from "@/components/Block";

import { currentDateFormat } from "@/helpers";

import styles from "./styles/index.module.scss";

export const DailyProgress = observer(() => {
  return (
    <Block
      title="Daily Progress"
      description={currentDateFormat()}
      className={styles.dailyProgress}
    >
      <div className={styles.dailyProgress__content}></div>
    </Block>
  );
});
