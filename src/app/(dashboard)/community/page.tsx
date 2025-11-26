"use client";

import { observer } from "mobx-react-lite";

import { Post } from "@/components/Post";

import styles from "./styles/index.module.scss";

const Community = observer(() => {
  return (
    <div className={styles.community}>
      <Post />
    </div>
  );
});

export default Community;
