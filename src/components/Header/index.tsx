"use client";

// import { usePathname } from "next/navigation";
import { observer } from "mobx-react-lite";

import { Button } from "../Button";
import { AuthModal } from "../Modals/AuthModal";
import { LogoBlock } from "./components/LogoBlock";

import { useStoreAuthorization } from "@/stores/domains/authorization";

import styles from "./styles/index.module.scss";

export const Header = observer(() => {
  const { isAuthModalOpen, openAuthModal, closeAuthModal } =
    useStoreAuthorization();
  // const pathname = usePathname();

  return (
    <header className={styles.header}>
      <LogoBlock />
      {/* <nav>
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
      </nav> */}
      <Button title="Start Now" onClick={openAuthModal} isUppercase />
      <AuthModal visible={isAuthModalOpen} onClose={closeAuthModal} />
    </header>
  );
});
