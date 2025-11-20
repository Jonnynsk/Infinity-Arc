import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { Block } from "@/components/Block";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

import { useStoreUsers } from "@/stores/domains/users";

import styles from "./styles/index.module.scss";

export const PersonalInfo = observer(() => {
  const {
    inputAboutMeHandler,
    inputNameHandler,
    updateMyProfile,
    isMyProfileLoading,
    myProfile,
  } = useStoreUsers();

  const handleUpdateMyProfile = () => {
    updateMyProfile({
      name: inputNameHandler.value || undefined,
      aboutMe: inputAboutMeHandler.value || undefined,
    });
  };

  useEffect(() => {
    inputNameHandler.setValue(myProfile.name);
    inputAboutMeHandler.setValue(myProfile.aboutMe);
  }, [myProfile.name, myProfile.aboutMe]);

  return (
    <Block title="Personal Information" className={styles.personalInfo}>
      <Input
        label="Name"
        placeholder="Enter your name"
        value={inputNameHandler.value}
        onChange={inputNameHandler.onChange}
      />
      <Input
        label="About me"
        placeholder="Enter something about yourself"
        value={inputAboutMeHandler.value}
        onChange={inputAboutMeHandler.onChange}
        isTextarea
      />
      <Button
        title="Save Changes"
        onClick={handleUpdateMyProfile}
        isLoading={isMyProfileLoading}
      />
    </Block>
  );
});
