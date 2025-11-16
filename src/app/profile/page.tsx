"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import Image from "next/image";

import { Button } from "@/components/Button";

import { ROUTES } from "@/constants/routes";
import { getCountryName, monthYearFormat } from "@/helpers";

import CalendarIcon from "@/public/icons/calendar.svg";
import LocationIcon from "@/public/icons/location.svg";

import { useStoreAuthorization } from "@/stores/domains/authorization";
import { useStoreUsers } from "@/stores/domains/users";

import styles from "./styles/index.module.scss";

const Profile = observer(() => {
  const router = useRouter();
  const { authLogout, isLogoutLoading } = useStoreAuthorization();
  const { getMyProfile, myProfile, isMyProfileLoading } = useStoreUsers();

  useEffect(() => {
    getMyProfile();
  }, []);

  const onLogoutAccount = () => {
    authLogout().then(() => {
      router.push(ROUTES.HOME);
    });
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profile__info}>
        <p className={styles.profile__name}>{myProfile.name}</p>
        <p className={styles.profile__text}>@{myProfile.username}</p>
        <div className={styles.profile__infoWrapper}>
          <div className={styles.profile__infoBlock}>
            <Image src={CalendarIcon} alt="calendar" width={20} height={20} />
            <p className={styles.profile__text}>
              Joined {monthYearFormat(myProfile.createdAt)}
            </p>
          </div>
          <div className={styles.profile__infoBlock}>
            <Image src={LocationIcon} alt="location" width={20} height={20} />
            <div className={styles.profile__country}>
              <p className={styles.profile__text}>
                {getCountryName(myProfile.country)}
              </p>
              <img
                src={`https://flagcdn.com/w20/${myProfile.country.toLowerCase()}.png`}
                alt={getCountryName(myProfile.country)}
                className={styles.profile__countryFlag}
              />
            </div>
          </div>
        </div>
      </div>

      <Button
        title="Exit"
        onClick={onLogoutAccount}
        isLoading={isLogoutLoading}
      />
    </div>
  );
});

export default Profile;
