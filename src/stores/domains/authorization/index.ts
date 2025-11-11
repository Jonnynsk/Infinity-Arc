import { applySnapshot, Instance, SnapshotIn, types } from "mobx-state-tree";

import { InputModel } from "@/stores/models/Input";
import { CheckBoxModel } from "@/stores/models/CheckBox";
import { SelectModel } from "@/stores/models/Select";

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
  })
  .actions((self) => {
    const setAuthActiveTab = (value: number) => {
      self.authActiveTab = value;
    };

    const authLogin = () => {
      console.log(self.email.value, self.password.value, self.rememberMe.value);
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
      authLogin,
      authRegister,
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
        onChange: self.email.setValue,
        errors: self.email.errors,
      };
    },
    get inputPasswordHandler() {
      return {
        value: self.password.value,
        onChange: self.password.setValue,
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
