import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/Button";

import styles from "./styles/index.module.scss";

interface IProps {
  title: string;
  icon: string;
  link?: string;
}

export const SocialLink = observer(
  ({ title = "", icon = "", link = "" }: IProps) => {
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
        </div>
        <Button title={link ? "Update" : "Connect"} onClick={() => {}} />
      </div>
    );
  }
);
