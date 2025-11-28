"use client";

import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { MainInfo } from "../components/MainInfo";
import { Tabs } from "@/components/Tabs";
import { PersonalInfo } from "../components/PersonalInfo";
import { SocialStats } from "../components/SocialStats";
import { SocialMedia } from "../components/SocialMedia";
import { Post } from "@/components/Post";

import { PROFILE_TABS } from "@/constants";

import { useStoreUsers } from "@/stores/domains/users";
import { useStorePosts } from "@/stores/domains/posts";

import styles from "./styles/index.module.scss";

const Profile = observer(() => {
  const {
    myProfile,
    sortedSocialNetworks,
    profileTabsList,
    profileActiveTab,
    setProfileActiveTab,
  } = useStoreUsers();
  const { getAllPosts, getOnlyMyPosts, deleteMyPost, isDeletePostLoading } =
    useStorePosts();

  useEffect(() => {
    getAllPosts();
  }, []);

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
      <Tabs
        listTabs={profileTabsList}
        activeTab={profileActiveTab}
        setActiveTab={setProfileActiveTab}
        classNameTab={styles.profile__tab}
      />
      <div className={styles.profile__content}>
        <div className={styles.profile__left}>
          {profileActiveTab === PROFILE_TABS.ABOUT && (
            <>
              <PersonalInfo />
              <SocialMedia
                socialNetworks={sortedSocialNetworks}
                isMyProfile={true}
              />
            </>
          )}

          {profileActiveTab === PROFILE_TABS.POSTS && (
            <div className={styles.profile__posts}>
              {getOnlyMyPosts.length > 0 ? (
                getOnlyMyPosts.map((post) => (
                  <Post
                    key={post.id}
                    content={post.content}
                    name={post.user.name}
                    username={post.user.username}
                    date={post.createdAt}
                    avatar={post.user.avatar}
                    likesCount={post.likesCount}
                    commentsCount={post.commentsCount}
                    repostsCount={post.repostsCount}
                    isMyPost={true}
                    onDelete={() => deleteMyPost(post.id)}
                    isDeletePostLoading={isDeletePostLoading}
                  />
                ))
              ) : (
                <div className={styles.profile__empty}>No posts yet</div>
              )}
            </div>
          )}

          {profileActiveTab === PROFILE_TABS.SAVED && (
            <div className={styles.profile__saved}>
              <div className={styles.profile__empty}>No saved posts yet</div>
            </div>
          )}
        </div>
        <div className={styles.profile__right}>
          <SocialStats socialStats={myProfile.socialStats} />
        </div>
      </div>
    </div>
  );
});

export default Profile;
