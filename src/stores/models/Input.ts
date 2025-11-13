import { Instance, types } from "mobx-state-tree";

export const InputModel = types
  .model("InputModel", {
    value: types.optional(types.string, ""),
    errors: types.optional(types.array(types.string), []),
  })
  .actions((self) => ({
    setValue(value: string) {
      self.value = value;
    },

    setErrors(value: string[]) {
      self.errors.replace(value);
    },

    clear() {
      self.value = "";
      self.errors.clear();
    },
  }));

export interface IInputModel extends Instance<typeof InputModel> {}
