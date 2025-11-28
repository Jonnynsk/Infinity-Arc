import { observer } from "mobx-react-lite";

import { Block } from "@/components/Block";

import { commaInNumber } from "@/helpers";

import FollowersIcon from "@/public/icons/socials/followers.svg";
import FollowingIcon from "@/public/icons/socials/following.svg";
import PostsIcon from "@/public/icons/socials/posts.svg";
import LikesIcon from "@/public/icons/socials/likes.svg";
import CommentsIcon from "@/public/icons/socials/comments.svg";

import { ISocialStats } from "@/stores/models/Profile";

import styles from "./styles/index.module.scss";

interface IProps {
  socialStats: ISocialStats[];
}

export const SocialStats = observer(({ socialStats = [] }: IProps) => {
  const getIcon = (title: string) => {
    switch (title) {
      case "Followers":
        return FollowersIcon;
      case "Following":
        return FollowingIcon;
      case "Posts":
        return PostsIcon;
      case "Likes Received":
        return LikesIcon;
      case "Comments":
        return CommentsIcon;
      default:
        return null;
    }
  };

  return (
    <Block title="Social Stats" className={styles.socialStats}>
      <div className={styles.socialStats__content}>
        {socialStats.map((stat) => {
          const Icon = getIcon(stat.title);

          return (
            <div key={stat.id} className={styles.socialStats__row}>
              <div className={styles.socialStats__rowTitle}>
                {Icon && <Icon className={styles.socialStats__icon} />}
                <h3 className={styles.socialStats__title}>{stat.title}</h3>
              </div>
              <p className={styles.socialStats__value}>
                {commaInNumber(stat.value)}
              </p>
            </div>
          );
        })}
      </div>
    </Block>
  );
});
