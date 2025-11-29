import { observer } from "mobx-react-lite";

import { Modal } from "@/components/Modal";
import { FollowUser } from "./components/FollowUser";
import { Loader } from "@/components/Loader";

import { IFollowUserModel } from "@/stores/models/Follow";

import styles from "./styles/index.module.scss";

interface IProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  isCloseIcon?: boolean;
  users: IFollowUserModel[];
  isLoading: boolean;
}

export const FollowModal = observer(
  ({
    visible = false,
    onClose = () => {},
    title = "",
    isCloseIcon = true,
    users = [],
    isLoading = false,
  }: IProps) => {
    return (
      <Modal visible={visible} onClose={onClose} isCloseIcon={isCloseIcon}>
        <div className={styles.followModal}>
          <h2 className={styles.followModal__title}>{title}</h2>
          {isLoading ? (
            <div className={styles.followModal__loading}>
              <Loader />
            </div>
          ) : (
            <div className={styles.followModal__users}>
              {users.map((user) => (
                <FollowUser key={user.id} user={user} onClose={onClose} />
              ))}
            </div>
          )}
        </div>
      </Modal>
    );
  }
);
