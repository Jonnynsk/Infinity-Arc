"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Image from "next/image";

import { getCountryName, monthYearFormat } from "@/helpers";

import CalendarIcon from "@/public/icons/calendar.svg";
import LocationIcon from "@/public/icons/location.svg";
import PhotoIcon from "@/public/icons/photo.svg";
import Avatar from "@/public/images/avatar.jpg";

import { useStoreUsers } from "@/stores/domains/users";

import styles from "./styles/index.module.scss";

export const MainInfo = observer(() => {
  const { getMyProfile, myProfile, isMyProfileLoading } = useStoreUsers();

  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <div className={styles.mainInfo}>
      <div className={styles.mainInfo__avatar}>
        <Image
          src={Avatar}
          alt={myProfile.name}
          width={128}
          height={128}
          className={styles.mainInfo__avatar}
        />
        <div className={styles.mainInfo__photoIcon}>
          <PhotoIcon />
        </div>
      </div>
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
  );
});
