import { Button } from "@/components/Button";

import styles from "./styles/index.module.scss";

interface IProps {
  onClose: () => void;
}

export const Login = ({ onClose = () => {} }: IProps) => {
  return (
    <div className={styles.login}>
      <h2 className={styles.login__title}>Welcome Back</h2>
      <p className={styles.login__description}>
        Continue your journey to greatness
      </p>

      <Button
        title="Login"
        isBorderRadius
        onClick={onClose}
        className={styles.login__button}
      />
    </div>
  );
};
