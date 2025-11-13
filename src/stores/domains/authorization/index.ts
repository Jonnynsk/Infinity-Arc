import { applySnapshot, Instance, SnapshotIn, types } from "mobx-state-tree";
import z from "zod";

import { IInputModel, InputModel } from "@/stores/models/Input";
import { CheckBoxModel } from "@/stores/models/CheckBox";
import { SelectModel } from "@/stores/models/Select";

import { requiredField } from "@/helpers/validation";

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

const StoreAuthorization = types
  .model("StoreAuthorization", {
    authActiveTab: types.optional(types.number, 0),
    email: types.optional(InputModel, {}),
    password: types.optional(InputModel, {}),
    firstName: types.optional(InputModel, {}),
    username: types.optional(InputModel, {}),
    country: types.optional(SelectModel, {}),
    confirmPassword: types.optional(InputModel, {}),
    rememberMe: types.optional(CheckBoxModel, {}),
    isAuthModalOpen: types.optional(types.boolean, false),
    isLoginLoading: types.optional(types.boolean, false),
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

    //Validation
    const validationLogin = (email: IInputModel, password: IInputModel) => {
      const result = loginSchema.safeParse({
        email: email.value,
        password: password.value,
      });

      if (!result.success) {
        const emailErrors = result.error.issues
          .filter((issue) => issue.path[0] === "email")
          .map((issue) => issue.message);

        const passwordErrors = result.error.issues
          .filter((issue) => issue.path[0] === "password")
          .map((issue) => issue.message);

        email.setErrors(emailErrors);
        password.setErrors(passwordErrors);
        return false;
      }

      return true;
    };

    const authLogin = async () => {
      if (!validationLogin(self.email, self.password)) {
        return;
      }

      setIsLoginLoading(true);

      try {
        console.log(self.email.value, self.password.value);

        closeAuthModal();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoginLoading(false);
      }
    };

    const authRegister = () => {
      console.log(
        self.firstName.value,
        self.username.value,
        self.country.value,
        self.email.value,
        self.password.value,
        self.confirmPassword.value
      );
    };

    return {
      setAuthActiveTab,
      openAuthModal,
      closeAuthModal,
      authLogin,
      authRegister,
      onChangeEmail,
      onChangePassword,
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
        onChange: self.confirmPassword.setValue,
        errors: self.confirmPassword.errors,
      };
    },
    get inputFirstNameHandler() {
      return {
        value: self.firstName.value,
        onChange: self.firstName.setValue,
        errors: self.firstName.errors,
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
