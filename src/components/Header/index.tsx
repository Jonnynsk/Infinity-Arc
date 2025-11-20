"use client";

import { observer } from "mobx-react-lite";

import { Button } from "../Button";
import { AuthModal } from "../Modals/AuthModal";
import { LogoBlock } from "./components/LogoBlock";

import { useStoreAuthorization } from "@/stores/domains/authorization";

import styles from "./styles/index.module.scss";

export const Header = observer(() => {
  const { isAuthModalOpen, openAuthModal, closeAuthModal } =
    useStoreAuthorization();

  return (
    <header className={styles.header}>
      <LogoBlock />
      <Button
        title="Start Now"
        onClick={openAuthModal}
        isUppercase
        isBorderRadius={false}
      />
      <AuthModal visible={isAuthModalOpen} onClose={closeAuthModal} />
    </header>
  );
});
