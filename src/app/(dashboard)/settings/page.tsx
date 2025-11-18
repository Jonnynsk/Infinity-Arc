"use client";

import { observer } from "mobx-react-lite";

import styles from "./styles/index.module.scss";

const Settings = observer(() => {
  return <div className={styles.settings}>settings</div>;
});

export default Settings;
