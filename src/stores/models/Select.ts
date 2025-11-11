import { types } from "mobx-state-tree";

export const SelectModel = types
  .model("SelectModel", {
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
