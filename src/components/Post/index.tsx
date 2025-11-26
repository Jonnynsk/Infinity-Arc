import { observer } from "mobx-react-lite";
import Image from "next/image";

import { ButtonIcon } from "./components/ButtonIcon";

import DefaultAvatar from "@/public/images/default-avatar.png";
import LikeIcon from "@/public/icons/post/like.svg";
import CommentIcon from "@/public/icons/post/comment.svg";
import RepostIcon from "@/public/icons/post/repost.svg";
import BookmarkIcon from "@/public/icons/post/bookmark.svg";
import OptionsIcon from "@/public/icons/post/options.svg";

import styles from "./styles/index.module.scss";

interface IProps {
  text: string;
  name: string;
  username: string;
  date: string;
  avatar: string;
}

export const Post = observer(() => {
  return (
    <div className={styles.post}>
      <div className={styles.post__header}>
        <Image src={DefaultAvatar} alt="avatar" width={48} height={48} />
        <div className={styles.post__userInfo}>
          <p className={styles.post__name}>Che Gevara</p>
          <p className={styles.post__details}>@main_hero • 2h</p>
        </div>
        <ButtonIcon
          icon={<OptionsIcon />}
          onClick={() => {}}
          title="Options"
          className={styles.post__options}
        />
      </div>
      <p className={styles.post__text}>
        Just crushed my morning workout! 💪 5AM club hits different. Remember:
        discipline is doing what needs to be done, even when you don't feel like
        it. Who else is starting their day with a win?
      </p>
      <div className={styles.post__actions}>
        <div className={styles.post__actionsLeft}>
          <ButtonIcon
            icon={<LikeIcon />}
            onClick={() => {}}
            text="247"
            title="Like"
          />
          <ButtonIcon
            icon={<CommentIcon />}
            onClick={() => {}}
            text="38"
            title="Reply"
          />
          <ButtonIcon
            icon={<RepostIcon />}
            onClick={() => {}}
            text="12"
            title="Repost"
          />
        </div>
        <ButtonIcon
          icon={<BookmarkIcon />}
          onClick={() => {}}
          title="Bookmark"
        />
      </div>
    </div>
  );
});
