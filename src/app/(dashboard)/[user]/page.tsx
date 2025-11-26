"use client";

import { observer } from "mobx-react-lite";
import { use, useEffect } from "react";
import { useRouter, notFound } from "next/navigation";

import { MainInfo } from "../components/MainInfo";
import { SocialStats } from "../components/SocialStats";
import { Block } from "@/components/Block";
import { InfoMode } from "../components/PersonalInfo/components/InfoMode";
import { SocialMedia } from "../components/SocialMedia";

import { ROUTES } from "@/constants/routes";

import { useStoreUsers } from "@/stores/domains/users";

import styles from "./styles/index.module.scss";

const UserPage = observer(
  ({ params }: { params: Promise<{ user: string }> }) => {
    const { user } = use(params);
    const {
      getUser,
      userInfo,
      isUserLoading,
      userNotFound,
      sortedUserSocialNetworks,
      myProfile,
    } = useStoreUsers();
    const router = useRouter();

    useEffect(() => {
      getUser(user);
    }, [user]);

    useEffect(() => {
      if (!isUserLoading && userInfo.id && myProfile.id === userInfo.id) {
        router.push(ROUTES.PROFILE);
      }
    }, [isUserLoading, userInfo.id, myProfile.id, router]);

    useEffect(() => {
      if (!isUserLoading && userNotFound) {
        notFound();
      }
    }, [isUserLoading, userNotFound]);

    return (
      <div className={styles.user}>
        <MainInfo
          name={userInfo.name}
          username={userInfo.username}
          createdAt={userInfo.createdAt}
          country={userInfo.country}
          avatar={userInfo.avatar}
          isMyProfile={false}
        />
        <div className={styles.user__content}>
          <div className={styles.user__left}>
            <Block title="Personal Information">
              <InfoMode name={userInfo.name} aboutMe={userInfo.aboutMe} />
            </Block>
            <SocialMedia
              socialNetworks={sortedUserSocialNetworks}
              isMyProfile={false}
            />
          </div>
          <div className={styles.user__right}>
            <SocialStats />
          </div>
        </div>
      </div>
    );
  }
);

export default UserPage;
