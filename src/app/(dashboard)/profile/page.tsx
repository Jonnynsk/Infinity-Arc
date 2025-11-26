"use client";

import { observer } from "mobx-react-lite";

import { MainInfo } from "../components/MainInfo";
import { PersonalInfo } from "../components/PersonalInfo";
import { SocialStats } from "../components/SocialStats";
import { SocialMedia } from "../components/SocialMedia";

import { useStoreUsers } from "@/stores/domains/users";

import styles from "./styles/index.module.scss";

const Profile = observer(() => {
  const { myProfile, sortedSocialNetworks } = useStoreUsers();

  return (
    <div className={styles.profile}>
      <MainInfo
        name={myProfile.name}
        username={myProfile.username}
        createdAt={myProfile.createdAt}
        country={myProfile.country}
        avatar={myProfile.avatar}
        isMyProfile={true}
      />
      <div className={styles.profile__content}>
        <div className={styles.profile__left}>
          <PersonalInfo />
          <SocialMedia
            socialNetworks={sortedSocialNetworks}
            isMyProfile={true}
          />
        </div>
        <div className={styles.profile__right}>
          <SocialStats />
        </div>
      </div>
    </div>
  );
});

export default Profile;
