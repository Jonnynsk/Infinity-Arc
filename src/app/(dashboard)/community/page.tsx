"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { CreatePost } from "@/components/CreatePost";
import { Post } from "@/components/Post";
import { SuggestedList } from "./components/SuggestedList";

import { useStoreUsers } from "@/stores/domains/users";
import { useStorePosts } from "@/stores/domains/posts";

import styles from "./styles/index.module.scss";

const Community = observer(() => {
  const { myProfile } = useStoreUsers();
  const {
    getAllPosts,
    posts,
    isPostsLoading,
    deleteMyPost,
    isDeletePostLoading,
  } = useStorePosts();

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className={styles.community}>
      <div className={styles.community__content}>
        <div className={styles.community__left}>
          <CreatePost />
          <div className={styles.community__posts}>
            {isPostsLoading ? (
              <div className={styles.community__postsLoading}>
                {/* <Loader /> */}
              </div>
            ) : (
              posts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  isMyPost={
                    myProfile.username !== "" &&
                    myProfile.username === post.user.username
                  }
                  onDelete={() => deleteMyPost(post.id)}
                  isDeletePostLoading={isDeletePostLoading}
                />
              ))
            )}
          </div>
        </div>
        <div className={styles.community__right}>
          <SuggestedList />
        </div>
      </div>
    </div>
  );
});

export default Community;
