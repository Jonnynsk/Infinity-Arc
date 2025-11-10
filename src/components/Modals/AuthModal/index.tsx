import { useState } from "react";

import { Modal } from "@/components/Modal";
import { Tabs } from "@/components/Tabs";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

import styles from "./styles/index.module.scss";

const AUTH_TABS = [
  {
    id: 0,
    title: "Login",
  },
  {
    id: 1,
    title: "Register",
  },
];

interface IProps {
  visible: boolean;
  onClose: () => void;
}

export const AuthModal = ({ visible = false, onClose = () => {} }: IProps) => {
  const [activeTab, setActiveTab] = useState<number>(AUTH_TABS[0].id);

  return (
    <Modal visible={visible} onClose={onClose}>
      <div className={styles.authModal}>
        <div className={styles.authModal__content}>
          <Tabs
            listTabs={AUTH_TABS}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <div className={styles.authModal__contentForm}>
            {activeTab === 0 ? (
              <Login onClose={onClose} />
            ) : (
              <Register onClose={onClose} />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
