import Image from "next/image";
import clsx from "clsx";

import DefaultAvatar from "@/public/images/default-avatar.png";

import styles from "./styles/index.module.scss";

interface IProps {
  avatar: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Avatar = ({
  avatar = "",
  width = 40,
  height = 40,
  className = "",
}: IProps) => {
  const avatarSrc = avatar || DefaultAvatar;

  return (
    <Image
      src={avatarSrc}
      alt="Avatar"
      width={width}
      height={height}
      className={clsx(styles.avatar, className)}
    />
  );
};
