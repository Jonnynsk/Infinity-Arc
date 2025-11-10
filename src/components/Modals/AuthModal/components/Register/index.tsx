import { Button } from "@/components/Button";

import styles from "./styles/index.module.scss";

interface IProps {
  onClose: () => void;
}

export const Register = ({ onClose = () => {} }: IProps) => {
  return (
    <div className={styles.register}>
      <h2 className={styles.register__title}>Start Your Journey</h2>
      <p className={styles.register__description}>
        Create your account and become unstoppable
      </p>

      <Button
        title="Create account"
        isBorderRadius
        onClick={onClose}
        className={styles.register__button}
      />
    </div>
  );
};
