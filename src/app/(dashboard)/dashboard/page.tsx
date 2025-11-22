"use client";

import { observer } from "mobx-react-lite";

import { DailyProgress } from "./components/DailyProgress";
import { HabitTracker } from "./components/HabitTracker";

import styles from "./styles/index.module.scss";

const Dashboard = observer(() => {
  return (
    <div className={styles.dashboard}>
      <DailyProgress />
      <HabitTracker />
    </div>
  );
});

export default Dashboard;
