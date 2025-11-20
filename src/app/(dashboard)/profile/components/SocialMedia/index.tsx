import { observer } from "mobx-react-lite";

import { Block } from "@/components/Block";
import { SocialLink } from "./components/SocialLink";

import { useStoreUsers } from "@/stores/domains/users";

import styles from "./styles/index.module.scss";

export const SocialMedia = observer(() => {
  const { socialLinks } = useStoreUsers();

  return (
    <Block title="Social Media" className={styles.socialMedia}>
      <div className={styles.socialMedia__content}>
        {socialLinks.map((link) => (
          <SocialLink
            key={link.id}
            title={link.title}
            icon={link.icon.src}
            link={link.link}
          />
        ))}
      </div>
    </Block>
  );
});
