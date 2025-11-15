import {
  applySnapshot,
  flow,
  Instance,
  SnapshotIn,
  types,
} from "mobx-state-tree";
import { AxiosError } from "axios";
import z from "zod";

import { InputModel } from "@/stores/models/Input";
import { CheckBoxModel } from "@/stores/models/CheckBox";
import { SelectModel } from "@/stores/models/Select";

import { requiredField } from "@/helpers/validation";
import { errorDev } from "@/helpers";

import { login, logout, register } from "@/api/requests";

const enum ErrorMessages {
  INVALID_EMAIL_OR_PASSWORD = "Invalid email or password",
}

const emailSchema = z.pipe(
  requiredField(),
  z.email({ message: "Invalid email address" })
);

const passwordSchema = z.pipe(
  requiredField(),
  z.string().min(8, { message: "Password must be at least 8 characters" })
);

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const passwordsSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const StoreAuthorization = types
  .model("StoreAuthorization", {
    authActiveTab: types.optional(types.number, 0),
    email: types.optional(InputModel, {}),
    password: types.optional(InputModel, {}),
    name: types.optional(InputModel, {}),
    username: types.optional(InputModel, {}),
    country: types.optional(SelectModel, {}),
    confirmPassword: types.optional(InputModel, {}),
    rememberMe: types.optional(CheckBoxModel, {}),
    isAuthModalOpen: types.optional(types.boolean, false),
    isLoginLoading: types.optional(types.boolean, false),
    isLogoutLoading: types.optional(types.boolean, false),
    isRegisterLoading: types.optional(types.boolean, false),
    isErrorEmailOrPassword: types.optional(types.string, ""),
  })
  .actions((self) => {
    const setAuthActiveTab = (value: number) => {
      self.authActiveTab = value;
    };

    const setIsAuthModalOpen = (value: boolean) => {
      self.isAuthModalOpen = value;
    };

    const setIsLoginLoading = (value: boolean) => {
      self.isLoginLoading = value;
    };

    const setIsLogoutLoading = (value: boolean) => {
      self.isLogoutLoading = value;
    };

    const setIsRegisterLoading = (value: boolean) => {
      self.isRegisterLoading = value;
    };

    const setIsErrorEmailOrPassword = (value: string) => {
      self.isErrorEmailOrPassword = value;
    };

    const closeAuthModal = () => {
      setIsAuthModalOpen(false);
    };

    const openAuthModal = () => {
      setIsAuthModalOpen(true);
    };

    const onChangeEmail = (value: string) => {
      self.email.setValue(value);
      self.email.setErrors([]);
    };

    const onChangePassword = (value: string) => {
      self.password.setValue(value);
      self.password.setErrors([]);
    };

    const onChangeConfirmPassword = (value: string) => {
      self.confirmPassword.setValue(value);
      self.confirmPassword.setErrors([]);
    };

    //Validation
    const validationLogin = () => {
      const result = loginSchema.safeParse({
        email: self.email.value,
        password: self.password.value,
      });

      if (!result.success) {
        const emailErrors = result.error.issues
          .filter((issue) => issue.path[0] === "email")
          .map((issue) => issue.message);

        const passwordErrors = result.error.issues
          .filter((issue) => issue.path[0] === "password")
          .map((issue) => issue.message);

        self.email.setErrors(emailErrors);
        self.password.setErrors(passwordErrors);
        return false;
      }

      return true;
    };

    const validationPasswords = () => {
      const result = passwordsSchema.safeParse({
        password: self.password.value,
        confirmPassword: self.confirmPassword.value,
      });

      if (!result.success) {
        const passwordErrors = result.error.issues
          .filter((issue) => issue.path[0] === "password")
          .map((issue) => issue.message);

        const confirmPasswordErrors = result.error.issues
          .filter((issue) => issue.path[0] === "confirmPassword")
          .map((issue) => issue.message);

        self.password.setErrors(passwordErrors);
        self.confirmPassword.setErrors(confirmPasswordErrors);
        return false;
      }

      return true;
    };

    const authLogin = flow(function* () {
      if (!validationLogin()) {
        return;
      }

      setIsLoginLoading(true);

      try {
        const params = {
          email: self.email.value,
          password: self.password.value,
        };

        const response = yield login(params);

        if (response) {
          closeAuthModal();
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("authLogin", error.response);

          if (
            error.response?.data.message ===
            ErrorMessages.INVALID_EMAIL_OR_PASSWORD
          ) {
            setIsErrorEmailOrPassword(ErrorMessages.INVALID_EMAIL_OR_PASSWORD);
          }
        }
      } finally {
        setIsLoginLoading(false);
      }
    });

    const authRegister = flow(function* () {
      if (!validationPasswords()) {
        return;
      }

      setIsRegisterLoading(true);

      try {
        const params = {
          name: self.name.value,
          username: self.username.value,
          country: self.country.value,
          email: self.email.value,
          password: self.password.value,
        };

        const response = yield register(params);

        if (response) {
          closeAuthModal();
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("authRegister", error.response);
        }
      } finally {
        setIsRegisterLoading(false);
      }
    });

    const authLogout = flow(function* () {
      setIsLogoutLoading(true);

      try {
        yield logout();
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("authLogout", error.response);
        }
      } finally {
        setIsLogoutLoading(false);
      }
    });

    return {
      setAuthActiveTab,
      openAuthModal,
      closeAuthModal,
      authLogin,
      authLogout,
      authRegister,
      onChangeEmail,
      onChangePassword,
      onChangeConfirmPassword,
    };
  })
  .views((self) => ({
    get authTabsList() {
      return [
        {
          id: 0,
          title: "Login",
        },
        {
          id: 1,
          title: "Register",
        },
      ];
    },
    get inputEmailHandler() {
      return {
        value: self.email.value,
        onChange: self.onChangeEmail,
        errors: self.email.errors,
      };
    },
    get inputPasswordHandler() {
      return {
        value: self.password.value,
        onChange: self.onChangePassword,
        errors: self.password.errors,
      };
    },
    get inputConfirmPasswordHandler() {
      return {
        value: self.confirmPassword.value,
        onChange: self.onChangeConfirmPassword,
        errors: self.confirmPassword.errors,
      };
    },
    get inputNameHandler() {
      return {
        value: self.name.value,
        onChange: self.name.setValue,
        errors: self.name.errors,
      };
    },
    get inputUsernameHandler() {
      return {
        value: self.username.value,
        onChange: self.username.setValue,
        errors: self.username.errors,
      };
    },
    get selectCountryHandler() {
      return {
        value: self.country.value,
        onChange: self.country.setValue,
        errors: self.country.errors,
      };
    },
    get checkBoxRememberMeHandler() {
      return {
        value: self.rememberMe.value,
        onChange: self.rememberMe.setValue,
        errors: self.rememberMe.errors,
      };
    },
  }));

interface IStoreAuthorization extends Instance<typeof StoreAuthorization> {}
interface IStoreAuthorizationSnapshotIn
  extends SnapshotIn<typeof StoreAuthorization> {}

let store: IStoreAuthorization;

function useStoreAuthorization(
  snapshot?: IStoreAuthorizationSnapshotIn
): IStoreAuthorization {
  if (!store) {
    store = StoreAuthorization.create();
  }

  if (snapshot) {
    applySnapshot(store, snapshot);
  }

  return store;
}

export { StoreAuthorization, useStoreAuthorization };
export type { IStoreAuthorization, IStoreAuthorizationSnapshotIn };
