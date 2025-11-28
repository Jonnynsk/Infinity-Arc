"use client";

import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { MainInfo } from "../components/MainInfo";
import { Tabs } from "@/components/Tabs";
import { PersonalInfo } from "../components/PersonalInfo";
import { SocialStats } from "../components/SocialStats";
import { SocialMedia } from "../components/SocialMedia";
import { CreatePost } from "@/components/CreatePost";
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
    sortedSocialStats,
  } = useStoreUsers();
  const {
    getAllPosts,
    getOnlyMyPosts,
    deleteMyPost,
    isDeletePostLoading,
    getAllSavedPosts,
    savedPosts,
  } = useStorePosts();

  useEffect(() => {
    if (profileActiveTab === PROFILE_TABS.POSTS) {
      getAllPosts();
    } else if (profileActiveTab === PROFILE_TABS.SAVED) {
      getAllSavedPosts();
    }
  }, [profileActiveTab]);

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
            <>
              <CreatePost />
              <div className={styles.profile__posts}>
                {getOnlyMyPosts.length > 0 ? (
                  getOnlyMyPosts.map((post) => (
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
                      isMyPost={true}
                      isLiked={post.isLiked}
                      isLikeLoading={post.isLikeLoading}
                      isSaveLoading={post.isSaveLoading}
                      isSaved={post.isSaved}
                      onDelete={() => deleteMyPost(post.id)}
                      isDeletePostLoading={isDeletePostLoading}
                    />
                  ))
                ) : (
                  <div className={styles.profile__empty}>No posts yet</div>
                )}
              </div>
            </>
          )}

          {profileActiveTab === PROFILE_TABS.SAVED && (
            <div className={styles.profile__posts}>
              {savedPosts.length > 0 ? (
                savedPosts.map((post) => (
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
                    isMyPost={myProfile.username === post.user.username}
                    isLiked={post.isLiked}
                    isLikeLoading={post.isLikeLoading}
                    isSaveLoading={post.isSaveLoading}
                    isSaved={post.isSaved}
                    onDelete={() => deleteMyPost(post.id)}
                    isDeletePostLoading={isDeletePostLoading}
                  />
                ))
              ) : (
                <div className={styles.profile__empty}>No saved posts yet</div>
              )}
            </div>
          )}
        </div>
        <div className={styles.profile__right}>
          <SocialStats socialStats={sortedSocialStats} />
        </div>
      </div>
    </div>
  );
});

export default Profile;
