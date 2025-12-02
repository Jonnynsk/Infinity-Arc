"use client";

import { useRef } from "react";
import { observer } from "mobx-react-lite";

import { Avatar } from "@/components/Avatar";

import { ALLOWED_TYPES } from "@/constants";

import PhotoIcon from "@/public/icons/photo.svg";

import { useStoreUsers } from "@/stores/domains/users";

import styles from "./styles/index.module.scss";

interface IProps {
  avatar: string;
  isMyProfile: boolean;
}

export const UploadAvatar = observer(
  ({ avatar = "", isMyProfile = false }: IProps) => {
    const { isUploadAvatarLoading, previewAvatar, onPreviewAvatarFile } =
      useStoreUsers();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
      if (!isUploadAvatarLoading) {
        fileInputRef.current?.click();
      }
    };

    const avatarSrc = previewAvatar || avatar;

    return (
      <div className={styles.uploadAvatar}>
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_TYPES.join(",")}
          onChange={onPreviewAvatarFile}
          style={{ display: "none" }}
        />
        <Avatar avatar={avatarSrc} width={128} height={128} />
        {isMyProfile && (
          <button
            className={styles.uploadAvatar__photoIcon}
            onClick={handleClick}
            type="button"
            disabled={isUploadAvatarLoading}
          >
            <PhotoIcon />
          </button>
        )}
      </div>
    );
  }
);
