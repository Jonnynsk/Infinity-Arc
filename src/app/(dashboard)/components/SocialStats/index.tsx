import { observer } from "mobx-react-lite";

import { Block } from "@/components/Block";

import { commaInNumber } from "@/helpers";

import { useStoreUsers } from "@/stores/domains/users";

import styles from "./styles/index.module.scss";

export const SocialStats = observer(() => {
  const { socialStats } = useStoreUsers();

  return (
    <Block title="Social Stats" className={styles.socialStats}>
      <div className={styles.socialStats__content}>
        {socialStats.map((stat) => (
          <div key={stat.id} className={styles.socialStats__row}>
            <div className={styles.socialStats__rowTitle}>
              <stat.icon />
              <h3 className={styles.socialStats__title}>{stat.title}</h3>
            </div>
            <p className={styles.socialStats__value}>
              {commaInNumber(stat.value)}
            </p>
          </div>
        ))}
      </div>
    </Block>
  );
});
