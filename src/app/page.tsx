"use client";

import { Introduction } from "./MainTemplates/Introduction";
import { Cycle } from "./MainTemplates/Cycle";
import { YouVsYou } from "./MainTemplates/YouVsYou";
import { Origin } from "./MainTemplates/Origin";
import { Philosophy } from "./MainTemplates/Philosophy";
import { Principles } from "./MainTemplates/Principles";
import { Manifesto } from "./MainTemplates/Manifesto";
import { Join } from "./MainTemplates/Join";

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
