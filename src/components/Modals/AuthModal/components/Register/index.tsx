import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";

import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Button } from "@/components/Button";

import { getCountryOptions } from "@/helpers";
import { ROUTES } from "@/constants/routes";

import { useStoreAuthorization } from "@/stores/domains/authorization";

import styles from "./styles/index.module.scss";

export const Register = observer(() => {
  const router = useRouter();
  const {
    inputNameHandler,
    inputUsernameHandler,
    inputEmailHandler,
    inputPasswordHandler,
    inputConfirmPasswordHandler,
    selectCountryHandler,
    authRegister,
    isRegisterLoading,
  } = useStoreAuthorization();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    authRegister().then(() => {
      router.push(ROUTES.DASHBOARD);
    });
  };

  return (
    <div className={styles.register}>
      <h2 className={styles.register__title}>Start Your Journey</h2>
      <p className={styles.register__description}>
        Create your account and become unstoppable
      </p>

      <form className={styles.register__form} onSubmit={handleSubmit}>
        <Input
          label="Name"
          placeholder="Your name"
          value={inputNameHandler.value}
          onChange={inputNameHandler.onChange}
          error={inputNameHandler.errors[0]}
          isGray
        />
        <Input
          label="Username"
          placeholder="Your username"
          value={inputUsernameHandler.value}
          onChange={inputUsernameHandler.onChange}
          error={inputUsernameHandler.errors[0]}
          isGray
        />
        <Select
          options={getCountryOptions()}
          value={selectCountryHandler.value}
          onChange={selectCountryHandler.onChange}
          placeholder="Select country"
          isCountry
          label="Your country"
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="Your email"
          value={inputEmailHandler.value}
          onChange={inputEmailHandler.onChange}
          error={inputEmailHandler.errors[0]}
          isGray
        />
        <Input
          label="Password"
          type="password"
          placeholder="Your password"
          value={inputPasswordHandler.value}
          onChange={inputPasswordHandler.onChange}
          error={inputPasswordHandler.errors[0]}
          isGray
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={inputConfirmPasswordHandler.value}
          onChange={inputConfirmPasswordHandler.onChange}
          error={inputConfirmPasswordHandler.errors[0]}
          isGray
        />
        <Button
          title="Create account"
          isBorderRadius
          type="submit"
          className={styles.register__button}
          isLoading={isRegisterLoading}
          isUppercase
        />
      </form>
    </div>
  );
});
