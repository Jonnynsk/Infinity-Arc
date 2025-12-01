import { observer } from "mobx-react-lite";
import clsx from "clsx";

import { Block } from "@/components/Block";

import { commaInNumber } from "@/helpers";
import { SocialStatsTitles } from "@/constants";

import FollowersIcon from "@/public/icons/socials/followers.svg";
import FollowingIcon from "@/public/icons/socials/following.svg";
import PostsIcon from "@/public/icons/socials/posts.svg";
import LikesIcon from "@/public/icons/socials/likes.svg";
import CommentsIcon from "@/public/icons/socials/comments.svg";

import { ISocialStats } from "@/stores/models/Profile";

import styles from "./styles/index.module.scss";

interface IProps {
  socialStats: ISocialStats[];
  openFollowersModal: () => void;
  openFollowingModal: () => void;
}

export const SocialStats = observer(
  ({
    socialStats = [],
    openFollowersModal = () => {},
    openFollowingModal = () => {},
  }: IProps) => {
    const getIcon = (title: string) => {
      switch (title) {
        case SocialStatsTitles.FOLLOWERS:
          return FollowersIcon;
        case SocialStatsTitles.FOLLOWING:
          return FollowingIcon;
        case SocialStatsTitles.POSTS:
          return PostsIcon;
        case SocialStatsTitles.LIKES_RECEIVED:
          return LikesIcon;
        case SocialStatsTitles.COMMENTS:
          return CommentsIcon;
        default:
          return null;
      }
    };

    const totalFollowers =
      socialStats?.find((stat) => stat.title === SocialStatsTitles.FOLLOWERS)
        ?.value ?? 0;

    const totalFollowing =
      socialStats?.find((stat) => stat.title === SocialStatsTitles.FOLLOWING)
        ?.value ?? 0;

    const handleOpenFollowModal = (title: string) => {
      if (title === SocialStatsTitles.FOLLOWERS && totalFollowers) {
        openFollowersModal();
      }

      if (title === SocialStatsTitles.FOLLOWING && totalFollowing) {
        openFollowingModal();
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
                  <h3
                    className={clsx(styles.socialStats__title, {
                      [styles.socialStats__title_clickable]:
                        (stat.title === SocialStatsTitles.FOLLOWERS &&
                          totalFollowers) ||
                        (stat.title === SocialStatsTitles.FOLLOWING &&
                          totalFollowing),
                    })}
                    onClick={() => handleOpenFollowModal(stat.title)}
                  >
                    {stat.title}
                  </h3>
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
  }
);
