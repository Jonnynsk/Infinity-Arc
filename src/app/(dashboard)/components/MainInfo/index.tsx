import { observer } from "mobx-react-lite";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useBalance, useConnection } from "wagmi";

import { UploadAvatar } from "./components/UploadAvatar";
import { Button } from "@/components/Button";
import { Label } from "@/components/Label";
import { ErrorModal } from "@/components/Modals/ErrorModal";

import { getCountryName, monthYearFormat } from "@/helpers";

import CalendarIcon from "@/public/icons/calendar.svg";
import LocationIcon from "@/public/icons/location.svg";
// import TimeIcon from "@/public/icons/time.svg";

import { useStoreUsers } from "@/stores/domains/users";
import { useStoreFollows } from "@/stores/domains/follows";

import styles from "./styles/index.module.scss";

interface IProps {
  userId?: string;
  name: string;
  username: string;
  createdAt: string;
  country: string;
  avatar: string;
  isMyProfile: boolean;
  isFollowing?: boolean;
  dayStreak?: number;
}

export const MainInfo = observer(
  ({
    userId = "",
    name = "",
    username = "",
    createdAt = "",
    country = "",
    avatar = "",
    isMyProfile = false,
    isFollowing = false,
    dayStreak = 0,
  }: IProps) => {
    const { avatarError, isAvatarErrorModal, closeAvatarErrorModal } =
      useStoreUsers();
    const {
      followUserAction,
      isFollowUserLoading,
      unfollowUserAction,
      isUnfollowUserLoading,
    } = useStoreFollows();

    const handleFollowUser = () => {
      if (isFollowing) {
        unfollowUserAction(userId);
      } else {
        followUserAction(userId);
      }
    };

    return (
      <>
        <div className={styles.mainInfo}>
          <div className={styles.mainInfo__content}>
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
              <div className={styles.mainInfo__labels}>
                <Label text="Pro Member" variant="yellow" />
                {dayStreak > 0 && (
                  <Label text={`${dayStreak} Day Streak`} variant="orange" />
                )}
              </div>
            </div>
          </div>
          {!isMyProfile && (
            <Button
              title={isFollowing ? "Unfollow" : "Follow"}
              onClick={handleFollowUser}
              variant="secondary"
              isLoading={isFollowUserLoading || isUnfollowUserLoading}
            />
          )}
          {isMyProfile && (
            <>
              {/* <span>
                {balance?.value && balance?.decimals
                  ? (Number(balance.value) / 10 ** balance.decimals).toFixed(5)
                  : "0.00000"}{" "}
                {balance?.symbol}
              </span> */}
              <ConnectButton showBalance={true} />
            </>
          )}
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
