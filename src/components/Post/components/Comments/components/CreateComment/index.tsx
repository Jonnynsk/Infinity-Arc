import { observer } from "mobx-react-lite";
import clsx from "clsx";

import { Avatar } from "@/components/Avatar";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

import { MAX_COMMENT_LENGTH } from "@/constants";

import { useStoreUsers } from "@/stores/domains/users";
import { useStoreComments } from "@/stores/domains/comments";

import styles from "./styles/index.module.scss";

interface IProps {
  postId: string;
  className?: string;
}

export const CreateComment = observer(
  ({ className = "", postId = "" }: IProps) => {
    const { myProfile } = useStoreUsers();
    const {
      inputCommentTextHandler,
      onCreateComment,
      isLoadingCreateCommentButton,
    } = useStoreComments();

    return (
      <div className={clsx(styles.createComment, className)}>
        <Avatar avatar={myProfile.avatar} />
        <div className={styles.createComment__textarea}>
          <Input
            placeholder="Add a comment..."
            value={inputCommentTextHandler.value}
            onChange={inputCommentTextHandler.onChange}
            isTextarea
            maxLength={MAX_COMMENT_LENGTH}
            className={styles.createComment__textareaInput}
            reserveErrorSpace={false}
          />
          <Button
            title="Comment"
            onClick={() => onCreateComment(postId)}
            isLoading={isLoadingCreateCommentButton}
            className={styles.createComment__button}
          />
        </div>
      </div>
    );
  }
);
