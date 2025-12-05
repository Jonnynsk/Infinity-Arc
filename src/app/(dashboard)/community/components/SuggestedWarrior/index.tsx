import Link from "next/link";

import { Avatar } from "@/components/Avatar";

import { commaInNumber } from "@/helpers";

import styles from "./styles/index.module.scss";

interface IProps {
  avatar: string;
  username: string;
  name: string;
  dayStreak: number;
  followers: number;
}

export const SuggestedWarrior = ({
  avatar = "",
  username = "",
  name = "",
  dayStreak = 0,
  followers = 0,
}: IProps) => {
  return (
    <div className={styles.suggestedWarrior}>
      <Link href={`/${username}`} className={styles.suggestedWarrior__content}>
        <Avatar avatar={avatar} />
        <div>
          <p className={styles.suggestedWarrior__name}>{name}</p>
          <p className={styles.suggestedWarrior__username}>@{username}</p>
        </div>
      </Link>
      <div>
        <p className={styles.suggestedWarrior__details}>
          Day Streak {dayStreak}
        </p>
        <p className={styles.suggestedWarrior__details}>
          Followers: {commaInNumber(followers)}
        </p>
      </div>
    </div>
  );
};
