import { observer } from "mobx-react-lite";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import styles from "./styles/index.module.scss";

interface IProps {
  id: string;
  title: string;
  icon: string;
  link?: string;
  updateSocialLink: (id: string, newLink: string) => void;
}

export const SocialLink = observer(
  ({
    title = "",
    icon = "",
    link = "",
    id,
    updateSocialLink = () => {},
  }: IProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [localLink, setLocalLink] = useState(link);

    const handleButtonClick = () => {
      if (isEditing) {
        updateSocialLink(id, localLink);
        setIsEditing(false);
      } else {
        setIsEditing(true);
      }
    };

    return (
      <div className={styles.socialLink}>
        <div className={styles.socialLink__content}>
          <Image
            src={icon}
            alt={title}
            width={48}
            height={48}
            className={styles.socialLink__icon}
          />
          {!isEditing ? (
            <div className={styles.socialLink__info}>
              <p className={styles.socialLink__title}>{title}</p>
              <Link
                href={link}
                target="_blank"
                className={styles.socialLink__link}
              >
                {link}
              </Link>
            </div>
          ) : (
            <Input
              value={localLink}
              onChange={setLocalLink}
              placeholder="Enter your link"
              className={styles.socialLink__input}
              reserveErrorSpace={false}
            />
          )}
        </div>
        <div className={styles.socialLink__buttons}>
          <Button
            title={isEditing ? "Save" : link ? "Update" : "Connect"}
            onClick={handleButtonClick}
          />
          {isEditing && (
            <Button
              title="Cancel"
              variant="secondary"
              onClick={() => setIsEditing(false)}
            />
          )}
        </div>
      </div>
    );
  }
);
