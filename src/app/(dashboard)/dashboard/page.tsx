"use client";

import { observer } from "mobx-react-lite";

import { DailyProgress } from "./components/DailyProgress";

import styles from "./styles/index.module.scss";

const Dashboard = observer(() => {
  return (
    <div className={styles.dashboard}>
      <DailyProgress />
    </div>
  );
});

export default Dashboard;
