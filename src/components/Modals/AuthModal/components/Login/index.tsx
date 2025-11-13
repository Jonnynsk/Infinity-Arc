import { observer } from "mobx-react-lite";

import { Input } from "@/components/Input";
// import { CheckBox } from "@/components/CheckBox";
import { Button } from "@/components/Button";

import { useStoreAuthorization } from "@/stores/domains/authorization";

import styles from "./styles/index.module.scss";

export const Login = observer(() => {
  const {
    inputEmailHandler,
    inputPasswordHandler,
    // checkBoxRememberMeHandler,
    authLogin,
  } = useStoreAuthorization();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    authLogin();
  };

  return (
    <div className={styles.login}>
      <h2 className={styles.login__title}>Welcome Back</h2>
      <p className={styles.login__description}>
        Continue your journey to greatness
      </p>

      <form className={styles.login__form} onSubmit={handleSubmit}>
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={inputEmailHandler.value}
          onChange={inputEmailHandler.onChange}
          error={inputEmailHandler.errors[0]}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={inputPasswordHandler.value}
          onChange={inputPasswordHandler.onChange}
          error={inputPasswordHandler.errors[0]}
        />
        {/* <CheckBox
          text="Remember me"
          checked={checkBoxRememberMeHandler.value}
          onChange={checkBoxRememberMeHandler.onChange}
        /> */}
        <Button
          title="Login"
          isBorderRadius
          type="submit"
          className={styles.login__button}
        />
      </form>
    </div>
  );
});
