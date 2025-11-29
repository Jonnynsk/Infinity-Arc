"use client";

import { observer } from "mobx-react-lite";
import { use, useEffect } from "react";
import { useRouter, notFound } from "next/navigation";

import { MainInfo } from "../components/MainInfo";
import { Tabs } from "@/components/Tabs";
import { SocialStats } from "../components/SocialStats";
import { Block } from "@/components/Block";
import { InfoMode } from "../components/PersonalInfo/components/InfoMode";
import { SocialMedia } from "../components/SocialMedia";
import { Post } from "@/components/Post";

import { ROUTES } from "@/constants/routes";
import { PROFILE_TABS } from "@/constants";

import { useStoreUsers } from "@/stores/domains/users";
import { useStorePosts } from "@/stores/domains/posts";

import styles from "./styles/index.module.scss";

const UserPage = observer(
  ({ params }: { params: Promise<{ user: string }> }) => {
    const { user } = use(params);
    const router = useRouter();
    const {
      getUser,
      userInfo,
      isUserLoading,
      userNotFound,
      sortedUserSocialNetworks,
      myProfile,
      usersProfileTabsList,
      usersProfileActiveTab,
      setUsersProfileActiveTab,
      sortedUserSocialStats,
    } = useStoreUsers();
    const { getAllPosts, getOnlyUserPosts } = useStorePosts();

    useEffect(() => {
      getAllPosts();
    }, []);

    useEffect(() => {
      getUser(user);
    }, [user]);

    useEffect(() => {
      if (
        !isUserLoading &&
        myProfile.username &&
        userInfo.username &&
        myProfile.username === user &&
        myProfile.username === userInfo.username
      ) {
        router.push(ROUTES.PROFILE);
      }
    }, [isUserLoading, myProfile.username, userInfo.username, user, router]);

    useEffect(() => {
      if (!isUserLoading && userNotFound) {
        notFound();
      }
    }, [isUserLoading, userNotFound]);

    return (
      <div className={styles.user}>
        <MainInfo
          userId={userInfo.id}
          name={userInfo.name}
          username={userInfo.username}
          createdAt={userInfo.createdAt}
          country={userInfo.country}
          avatar={userInfo.avatar}
          isFollowing={userInfo.isFollowing}
          isMyProfile={false}
        />
        <Tabs
          listTabs={usersProfileTabsList}
          activeTab={usersProfileActiveTab}
          setActiveTab={setUsersProfileActiveTab}
          classNameTab={styles.user__tab}
        />
        <div className={styles.user__content}>
          <div className={styles.user__left}>
            {usersProfileActiveTab === PROFILE_TABS.POSTS && (
              <div className={styles.user__posts}>
                {getOnlyUserPosts.length > 0 ? (
                  getOnlyUserPosts.map((post) => (
                    <Post
                      key={post.id}
                      postId={post.id}
                      content={post.content}
                      name={post.user.name}
                      username={post.user.username}
                      date={post.createdAt}
                      avatar={post.user.avatar}
                      likesCount={post.likesCount}
                      commentsCount={post.commentsCount}
                      repostsCount={post.repostsCount}
                      isLiked={post.isLiked}
                      isLikeLoading={post.isLikeLoading}
                      isSaveLoading={post.isSaveLoading}
                      isSaved={post.isSaved}
                      isMyPost={false}
                    />
                  ))
                ) : (
                  <div className={styles.user__empty}>No posts yet</div>
                )}
              </div>
            )}

            {usersProfileActiveTab === PROFILE_TABS.ABOUT && (
              <>
                <Block title="Personal Information">
                  <InfoMode name={userInfo.name} aboutMe={userInfo.aboutMe} />
                </Block>
                <SocialMedia
                  socialNetworks={sortedUserSocialNetworks}
                  isMyProfile={false}
                />
              </>
            )}
          </div>
          <div className={styles.user__right}>
            <SocialStats socialStats={sortedUserSocialStats} />
          </div>
        </div>
      </div>
    );
  }
);

export default UserPage;
