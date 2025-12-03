import { observer } from "mobx-react-lite";

import { Block } from "@/components/Block";

import { currentDateFormat } from "@/helpers";

import { useStoreUsers } from "@/stores/domains/users";

import styles from "./styles/index.module.scss";

export const DailyProgress = observer(() => {
  const { myProfile } = useStoreUsers();

  return (
    <Block
      title="Daily Progress"
      description={currentDateFormat()}
      className={styles.dailyProgress}
    >
      <div className={styles.dailyProgress__content}>
        <div className={styles.dailyProgress__streakBlock}>
          <p className={styles.dailyProgress__streakValue}>
            {myProfile?.dayStreak}
          </p>
          <p className={styles.dailyProgress__streakTitle}>Day Streak</p>
        </div>
      </div>
    </Block>
  );
});
