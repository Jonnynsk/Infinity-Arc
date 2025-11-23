import { observer } from "mobx-react-lite";

import { useStoreActivity } from "@/stores/domains/activity";

import styles from "./styles/index.module.scss";

export const WeekCompletion = observer(() => {
  const { weekCompletionPercentage } = useStoreActivity();

  return (
    <div className={styles.weekCompletion}>
      <p className={styles.weekCompletion__percentage}>
        {weekCompletionPercentage}%
      </p>
      <p className={styles.weekCompletion__title}>Week Completion</p>
    </div>
  );
});
