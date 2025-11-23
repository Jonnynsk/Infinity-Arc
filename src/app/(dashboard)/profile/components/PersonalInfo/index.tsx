import { observer } from "mobx-react-lite";

import { Block } from "@/components/Block";
import { Button } from "@/components/Button";
import { EditMode } from "./components/EditMode";
import { InfoMode } from "./components/InfoMode";

import EditIcon from "@/public/icons/edit.svg";

import { useStoreUsers } from "@/stores/domains/users";

import styles from "./styles/index.module.scss";

export const PersonalInfo = observer(() => {
  const {
    inputAboutMeHandler,
    inputNameHandler,
    updateMyProfile,
    isMyProfileLoading,
    isEditMode,
    setIsEditMode,
  } = useStoreUsers();

  const handleUpdateMyProfile = () => {
    updateMyProfile({
      name: inputNameHandler.value ?? "",
      aboutMe: inputAboutMeHandler.value ?? "",
    }).then(() => {
      setIsEditMode(false);
    });
  };

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <Block title="Personal Information" className={styles.personalInfo}>
      <button
        className={styles.personalInfo__edit}
        onClick={handleEditMode}
        type="button"
      >
        <EditIcon />
        <p className={styles.personalInfo__editTitle}>Edit</p>
      </button>
      {isEditMode ? <EditMode /> : <InfoMode />}
      {isEditMode && (
        <div className={styles.personalInfo__buttons}>
          <Button
            title="Save Changes"
            onClick={handleUpdateMyProfile}
            isLoading={isMyProfileLoading}
          />
          <Button title="Cancel" onClick={handleEditMode} variant="secondary" />
        </div>
      )}
    </Block>
  );
});
