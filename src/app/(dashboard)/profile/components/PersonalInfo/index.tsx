import { observer } from "mobx-react-lite";

import { Block } from "@/components/Block";
import { Input } from "@/components/Input";

import { useStoreUsers } from "@/stores/domains/users";

import styles from "./styles/index.module.scss";

export const PersonalInfo = observer(() => {
  const { inputAboutMeHandler } = useStoreUsers();

  return (
    <Block title="Personal Information" className={styles.personalInfo}>
      <Input
        label="About me"
        placeholder="Enter something about yourself"
        value={inputAboutMeHandler.value}
        onChange={inputAboutMeHandler.onChange}
        isTextarea
      />
    </Block>
  );
});
