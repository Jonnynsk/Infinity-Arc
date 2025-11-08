"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { Button } from "../Button";

import { PAGES_LINKS } from "@/constants";

import Logo from "@/public/icons/logo.svg";

import styles from "./styles/index.module.scss";

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.header__logo}>
        <Image src={Logo} alt="Logo" width={37.5} height={30} />
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
      <Button title="Start Now" />
    </header>
  );
};
