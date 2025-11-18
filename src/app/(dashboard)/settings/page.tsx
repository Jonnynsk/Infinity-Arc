"use client";

import { observer } from "mobx-react-lite";

import { ChangePassword } from "./components/ChangePassword";

import styles from "./styles/index.module.scss";

const Settings = observer(() => {
  return (
    <div className={styles.settings}>
      <ChangePassword />
    </div>
  );
});

export default Settings;
