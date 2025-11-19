"use client";

import { observer } from "mobx-react-lite";

import { MainInfo } from "./components/MainInfo";
import { PersonalInfo } from "./components/PersonalInfo";
import { SocialStats } from "./components/SocialStats";

import styles from "./styles/index.module.scss";

const Profile = observer(() => {
  return (
    <div className={styles.profile}>
      <MainInfo />
      <div className={styles.profile__content}>
        <PersonalInfo />
        <SocialStats />
      </div>
    </div>
  );
});

export default Profile;
