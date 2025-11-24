"use client";

import { useRef } from "react";
import { observer } from "mobx-react-lite";
import Image from "next/image";

import { ALLOWED_TYPES } from "@/constants";

import PhotoIcon from "@/public/icons/photo.svg";
import DefaultAvatar from "@/public/images/default-avatar.png";

import { useStoreUsers } from "@/stores/domains/users";

import styles from "./styles/index.module.scss";

export const UploadAvatar = observer(() => {
  const {
    myProfile,
    isUploadAvatarLoading,
    previewAvatar,
    onPreviewAvatarFile,
  } = useStoreUsers();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {  
    if (!isUploadAvatarLoading) {
      fileInputRef.current?.click();
    }
  };

  const avatarSrc = previewAvatar || myProfile.avatar || DefaultAvatar;

  return (
    <div className={styles.uploadAvatar}>
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_TYPES.join(",")}
        onChange={onPreviewAvatarFile}
        style={{ display: "none" }}
      />
      <Image
        src={avatarSrc}
        alt="Avatar"
        width={128}
        height={128}
        className={styles.uploadAvatar__image}
      />
      <button
        className={styles.uploadAvatar__photoIcon}
        onClick={handleClick}
        type="button"
        disabled={isUploadAvatarLoading}
      >
        <PhotoIcon />
      </button>
    </div>
  );
});
