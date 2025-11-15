"use client";

import { usePathname } from "next/navigation";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import Image from "next/image";

import { Button } from "../Button";
import { AuthModal } from "../Modals/AuthModal";

import { PAGES_LINKS } from "@/constants";
import { ROUTES } from "@/constants/routes";

import Logo from "@/public/icons/logo.svg";

import { useStoreAuthorization } from "@/stores/domains/authorization";

import styles from "./styles/index.module.scss";

export const Header = observer(() => {
  const { isAuthModalOpen, openAuthModal, closeAuthModal } =
    useStoreAuthorization();
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Link href={ROUTES.HOME} className={styles.header__logo}>
        <Image src={Logo} alt="Logo" width={38} height={30} />
        <span className={styles.header__logoTitle}>Infinity Arc</span>
      </Link>
      <nav>
        <ul className={styles.header__links}>
          {PAGES_LINKS.map((page) => (
            <li
              key={page.href}
              className={`${styles.header__link} ${
                pathname === page.href ? styles.header__linkActive : ""
              }`}
            >
              <Link href={page.href}>{page.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Button title="Start Now" onClick={openAuthModal} />
      <AuthModal visible={isAuthModalOpen} onClose={closeAuthModal} />
    </header>
  );
});
