import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Block } from "@/components/Block";
import { Loader } from "@/components/Loader";
import { SuggestedWarrior } from "../SuggestedWarrior";

import { SocialStatsTitles } from "@/constants";

import { useStoreUsers } from "@/stores/domains/users";

import styles from "./styles/index.module.scss";

export const SuggestedList = observer(() => {
  const { getSuggestedUsers, suggestedUsers, isSuggestedUsersLoading } =
    useStoreUsers();

  useEffect(() => {
    getSuggestedUsers();
  }, []);

  return (
    <Block title="Suggested Warriors" className={styles.suggested}>
      {isSuggestedUsersLoading ? (
        <div className={styles.suggested__loading}>
          <Loader />
        </div>
      ) : (
        <div className={styles.suggested__content}>
          {suggestedUsers.map((user) => (
            <SuggestedWarrior
              key={user.id}
              avatar={user.avatar}
              username={user.username}
              name={user.name}
              dayStreak={user.dayStreak}
              followers={
                user.socialStats.find(
                  (stat) => stat.title === SocialStatsTitles.FOLLOWERS
                )?.value || 0
              }
            />
          ))}
        </div>
      )}
    </Block>
  );
});
