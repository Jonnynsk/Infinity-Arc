import { observer } from "mobx-react-lite";

import { Avatar } from "../Avatar";
import { Input } from "../Input";
import { Button } from "../Button";

import { MAX_TEXTAREA_LENGTH } from "@/constants";

import { useStoreUsers } from "@/stores/domains/users";
import { useStorePosts } from "@/stores/domains/posts";

import styles from "./styles/index.module.scss";

export const CreatePost = observer(() => {
  const { myProfile } = useStoreUsers();
  const { inputPostTextHandler, createNewPost, isLoadingCreatePostButton } =
    useStorePosts();

  return (
    <div className={styles.createPost}>
      <div className={styles.createPost__textarea}>
        <Avatar avatar={myProfile.avatar} width={48} height={48} />
        <Input
          placeholder="Share your progress, thoughts, or motivation..."
          value={inputPostTextHandler.value}
          onChange={inputPostTextHandler.onChange}
          isTextarea
          maxLength={MAX_TEXTAREA_LENGTH}
          className={styles.createPost__textareaInput}
          reserveErrorSpace={false}
        />
      </div>
      <div className={styles.createPost__buttons}>
        <Button
          title="Post"
          onClick={createNewPost}
          isLoading={isLoadingCreatePostButton}
          className={styles.createPost__button}
        />
      </div>
    </div>
  );
});
