"use client";

import { observer } from "mobx-react-lite";
import { use, useEffect } from "react";
import { useRouter, notFound } from "next/navigation";

import { MainInfo } from "../components/MainInfo";

import { ROUTES } from "@/constants/routes";

import { useStoreUsers } from "@/stores/domains/users";

import styles from "./styles/index.module.scss";

const UserPage = observer(
  ({ params }: { params: Promise<{ user: string }> }) => {
    const { user } = use(params);
    const { getUser, userInfo, isMyProfile, isUserLoading, userNotFound } =
      useStoreUsers();
    const router = useRouter();

    useEffect(() => {
      getUser(user);
    }, [user]);

    useEffect(() => {
      if (!isUserLoading && userInfo.id && isMyProfile) {
        router.push(ROUTES.PROFILE);
      }
    }, [isMyProfile, isUserLoading, userInfo.id, router]);

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
          isMyProfile={isMyProfile}
        />
      </div>
    );
  }
);

export default UserPage;
