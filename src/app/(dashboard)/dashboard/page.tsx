"use client";

import { observer } from "mobx-react-lite";

import styles from "./styles/index.module.scss";

const Dashboard = observer(() => {
  return <div className={styles.dashboard}>dashboard</div>;
});

export default Dashboard;
