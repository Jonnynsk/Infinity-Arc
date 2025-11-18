"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { getCountryName, monthYearFormat } from "@/helpers";

import CalendarIcon from "@/public/icons/calendar.svg";
import LocationIcon from "@/public/icons/location.svg";

import { useStoreUsers } from "@/stores/domains/users";

import styles from "./styles/index.module.scss";

const Profile = observer(() => {
  const { getMyProfile, myProfile, isMyProfileLoading } = useStoreUsers();

  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <div className={styles.profile}>
      <div className={styles.profile__info}>
        <p className={styles.profile__name}>{myProfile.name}</p>
        <p className={styles.profile__text}>@{myProfile.username}</p>
        <div className={styles.profile__infoWrapper}>
          <div className={styles.profile__infoBlock}>
            <CalendarIcon />
            <p className={styles.profile__text}>
              Joined {monthYearFormat(myProfile.createdAt)}
            </p>
          </div>
          <div className={styles.profile__infoBlock}>
            <LocationIcon />
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
    </div>
  );
});

export default Profile;
