"use client";

import { Introduction } from "./components/Introduction";
import { Cycle } from "./components/Cycle";
import { YouVsYou } from "./components/YouVsYou";
import { Origin } from "./components/Origin";
import { Philosophy } from "./components/Philosophy";
import { Principles } from "./components/Principles";
import { Manifesto } from "./components/Manifesto";
import { Join } from "./components/Join";

import { AuthModal } from "@/components/Modals/AuthModal";

import { useStoreAuthorization } from "@/stores/domains/authorization";

import styles from "./page.module.scss";

export default function Home() {
  const { isAuthModalOpen, closeAuthModal } = useStoreAuthorization();

  return (
    <div className={styles.page}>
      <main className={styles.page__main}>
        <Introduction />
        <Cycle className={styles.page__cycle} />
        <YouVsYou />
        <Origin />
        <Philosophy />
        <Manifesto />
        <Principles />
        <Join />
      </main>
      <AuthModal visible={isAuthModalOpen} onClose={closeAuthModal} />
    </div>
  );
}
