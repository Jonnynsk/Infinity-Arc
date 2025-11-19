import { observer } from "mobx-react-lite";

import { Modal } from "@/components/Modal";
import { Tabs } from "@/components/Tabs";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

import { useStoreAuthorization } from "@/stores/domains/authorization";

import styles from "./styles/index.module.scss";

interface IProps {
  visible: boolean;
  onClose: () => void;
  isBlack?: boolean;
}

export const AuthModal = observer(
  ({ visible = false, onClose = () => {}, isBlack = false }: IProps) => {
    const { authActiveTab, authTabsList, setAuthActiveTab } =
      useStoreAuthorization();

    return (
      <Modal visible={visible} onClose={onClose} isBlack={isBlack}>
        <div className={styles.authModal}>
          <div className={styles.authModal__content}>
            <Tabs
              listTabs={authTabsList}
              activeTab={authActiveTab}
              setActiveTab={setAuthActiveTab}
            />
            <div className={styles.authModal__contentForm}>
              {authActiveTab === 0 ? <Login /> : <Register />}
            </div>
          </div>
        </div>
      </Modal>
    );
  }
);
