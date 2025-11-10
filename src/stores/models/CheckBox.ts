import { types } from "mobx-state-tree";

export const CheckBoxModel = types
  .model("CheckBoxModel", {
    value: types.optional(types.boolean, false),
    errors: types.optional(types.array(types.string), []),
  })
  .actions((self) => ({
    setValue(value: boolean) {
      self.value = value;
    },

    setErrors(value: string[]) {
      self.errors.replace(value);
    },

    clear() {
      self.value = false;
      self.errors.clear();
    },
  }));
