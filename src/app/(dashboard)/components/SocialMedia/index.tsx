import { observer } from "mobx-react-lite";

import { Block } from "@/components/Block";
import { SocialLink } from "./components/SocialLink";

import TelegramIcon from "@/public/icons/socialMedia/telegram.png";
import YouTubeIcon from "@/public/icons/socialMedia/youtube.png";
import InstagramIcon from "@/public/icons/socialMedia/instagram.png";
import XIcon from "@/public/icons/socialMedia/twitter.png";

import { useStoreUsers } from "@/stores/domains/users";
import { ISocialNetwork } from "@/stores/models/Profile";

import styles from "./styles/index.module.scss";

interface IProps {
  socialNetworks: ISocialNetwork[];
  isMyProfile: boolean;
}

export const SocialMedia = observer(
  ({ socialNetworks = [], isMyProfile = false }: IProps) => {
    const { updateSocialLink } = useStoreUsers();

    const getIcon = (title: string) => {
      switch (title) {
        case "Telegram":
          return TelegramIcon.src;
        case "YouTube":
          return YouTubeIcon.src;
        case "Instagram":
          return InstagramIcon.src;
        case "X (Twitter)":
          return XIcon.src;
        default:
          return "";
      }
    };

    return (
      <Block title="Social Media" className={styles.socialMedia}>
        <div className={styles.socialMedia__content}>
          {socialNetworks.map((link) => (
            <SocialLink
              key={link.id}
              id={link.id}
              title={link.title}
              icon={getIcon(link.title)}
              link={link.link}
              updateSocialLink={updateSocialLink}
              isMyProfile={isMyProfile}
            />
          ))}
        </div>
      </Block>
    );
  }
);
