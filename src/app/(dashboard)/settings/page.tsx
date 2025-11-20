"use client";

import { observer } from "mobx-react-lite";

import { ChangePassword } from "./components/ChangePassword";
import { DangerZone } from "./components/DangerZone";

import styles from "./styles/index.module.scss";

const Settings = observer(() => {
  return (
    <div className={styles.settings}>
      <ChangePassword />
      <DangerZone />
    </div>
  );
});

export default Settings;
