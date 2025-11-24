import { observer } from "mobx-react-lite";

import { UploadAvatar } from "./components/UploadAvatar";
import { ErrorModal } from "@/components/Modals/ErrorModal";

import { getCountryName, monthYearFormat } from "@/helpers";

import CalendarIcon from "@/public/icons/calendar.svg";
import LocationIcon from "@/public/icons/location.svg";

import { useStoreUsers } from "@/stores/domains/users";

import styles from "./styles/index.module.scss";

export const MainInfo = observer(() => {
  const { myProfile, avatarError, isAvatarErrorModal, closeAvatarErrorModal } =
    useStoreUsers();

  return (
    <>
      <div className={styles.mainInfo}>
        <UploadAvatar />
        <div className={styles.mainInfo__info}>
          <p className={styles.mainInfo__name}>{myProfile.name}</p>
          <p className={styles.mainInfo__username}>@{myProfile.username}</p>
          <div className={styles.mainInfo__infoWrapper}>
            <div className={styles.mainInfo__infoBlock}>
              <CalendarIcon />
              <p className={styles.mainInfo__text}>
                Joined {monthYearFormat(myProfile.createdAt)}
              </p>
            </div>
            <div className={styles.mainInfo__infoBlock}>
              <LocationIcon />
              <div className={styles.mainInfo__country}>
                <p className={styles.mainInfo__text}>
                  {getCountryName(myProfile.country)}
                </p>
                <img
                  src={`https://flagcdn.com/w20/${myProfile.country.toLowerCase()}.png`}
                  alt={getCountryName(myProfile.country)}
                  className={styles.mainInfo__countryFlag}
                />
              </div>
            </div>
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
});
