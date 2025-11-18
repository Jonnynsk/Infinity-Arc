import { observer } from "mobx-react-lite";

import { Block } from "@/components/Block";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

import { useStoreAuthorization } from "@/stores/domains/authorization";

import styles from "./styles/index.module.scss";

export const ChangePassword = observer(() => {
  const {
    inputCurrentPasswordHandler,
    inputNewPasswordHandler,
    inputConfirmNewPasswordHandler,
  } = useStoreAuthorization();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Block
      title="Change Password"
      description="Update your password"
      className={styles.changePassword}
    >
      <form className={styles.changePassword__form} onSubmit={handleSubmit}>
        <Input
          label="Current Password"
          type="password"
          placeholder="Enter your current password"
          value={inputCurrentPasswordHandler.value}
          onChange={inputCurrentPasswordHandler.onChange}
          error={inputCurrentPasswordHandler.errors[0]}
        />
        <Input
          label="New Password"
          type="password"
          placeholder="Enter your new password"
          value={inputNewPasswordHandler.value}
          onChange={inputNewPasswordHandler.onChange}
          error={inputNewPasswordHandler.errors[0]}
        />
        <Input
          label="Confirm New Password"
          type="password"
          placeholder="Confirm your new password"
          value={inputConfirmNewPasswordHandler.value}
          onChange={inputConfirmNewPasswordHandler.onChange}
          error={inputConfirmNewPasswordHandler.errors[0]}
        />
        <Button
          title="Update Password"
          type="submit"
          isBorderRadius
          className={styles.changePassword__button}
        />
      </form>
    </Block>
  );
});
