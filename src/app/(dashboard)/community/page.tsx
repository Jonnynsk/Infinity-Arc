"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { CreatePost } from "@/components/CreatePost";
import { Post } from "@/components/Post";

import { useStoreUsers } from "@/stores/domains/users";
import { useStorePosts } from "@/stores/domains/posts";

import styles from "./styles/index.module.scss";

const Community = observer(() => {
  const { myProfile } = useStoreUsers();
  const { getAllPosts, posts, isPostsLoading } = useStorePosts();

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className={styles.community}>
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
              content={post.content}
              name={post.user.name}
              username={post.user.username}
              date={post.createdAt}
              avatar={post.user.avatar}
              likesCount={post.likesCount}
              commentsCount={post.commentsCount}
              repostsCount={post.repostsCount}
              isMyPost={myProfile.username === post.user.username}
            />
          ))
        )}
      </div>
    </div>
  );
});

export default Community;
