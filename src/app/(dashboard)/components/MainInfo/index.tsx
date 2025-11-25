import { observer } from "mobx-react-lite";

import { UploadAvatar } from "./components/UploadAvatar";
import { ErrorModal } from "@/components/Modals/ErrorModal";

import { getCountryName, monthYearFormat } from "@/helpers";

import CalendarIcon from "@/public/icons/calendar.svg";
import LocationIcon from "@/public/icons/location.svg";
// import TimeIcon from "@/public/icons/time.svg";

import { useStoreUsers } from "@/stores/domains/users";

import styles from "./styles/index.module.scss";

interface IProps {
  name: string;
  username: string;
  createdAt: string;
  country: string;
  avatar: string;
  isMyProfile: boolean;
}

export const MainInfo = observer(
  ({
    name = "",
    username = "",
    createdAt = "",
    country = "",
    avatar = "",
    isMyProfile = false,
  }: IProps) => {
    const { avatarError, isAvatarErrorModal, closeAvatarErrorModal } =
      useStoreUsers();

    return (
      <>
        <div className={styles.mainInfo}>
          <UploadAvatar avatar={avatar} isMyProfile={isMyProfile} />
          <div className={styles.mainInfo__info}>
            <p className={styles.mainInfo__name}>{name}</p>
            <p className={styles.mainInfo__username}>@{username}</p>
            <div className={styles.mainInfo__infoWrapper}>
              <div className={styles.mainInfo__infoBlock}>
                <CalendarIcon />
                <p className={styles.mainInfo__text}>
                  Joined {monthYearFormat(createdAt)}
                </p>
              </div>
              <div className={styles.mainInfo__infoBlock}>
                <LocationIcon />
                <div className={styles.mainInfo__country}>
                  <p className={styles.mainInfo__text}>
                    {getCountryName(country)}
                  </p>
                  <img
                    src={`https://flagcdn.com/w20/${country.toLowerCase()}.png`}
                    alt={getCountryName(country)}
                    className={styles.mainInfo__countryFlag}
                  />
                </div>
              </div>
              {/* {!isMyProfile && (
                <div className={styles.mainInfo__infoBlock}>
                  <TimeIcon />
                  <p className={styles.mainInfo__text}>
                    Last active: 2 hours ago
                  </p>
                </div>
              )} */}
            </div>
          </div>
        </div>
        <ErrorModal
          visible={isAvatarErrorModal}
          onClose={closeAvatarErrorModal}
          title="Avatar Error"
          description={avatarError}
        />
      </>
    );
  }
);
