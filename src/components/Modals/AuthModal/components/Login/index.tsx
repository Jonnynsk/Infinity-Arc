import { useState } from "react";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

import styles from "./styles/index.module.scss";

interface IProps {
  onClose: () => void;
}

export const Login = ({ onClose = () => {} }: IProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.login}>
      <h2 className={styles.login__title}>Welcome Back</h2>
      <p className={styles.login__description}>
        Continue your journey to greatness
      </p>

      <div className={styles.login__inputs}>
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={setEmail}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={setPassword}
        />
      </div>

      <Button
        title="Login"
        isBorderRadius
        onClick={onClose}
        className={styles.login__button}
      />
    </div>
  );
};
