"use client";

import { observer } from "mobx-react-lite";

import { MainInfo } from "./components/MainInfo";

import styles from "./styles/index.module.scss";

const Profile = observer(() => {
  return (
    <div className={styles.profile}>
      <MainInfo />
    </div>
  );
});

export default Profile;
