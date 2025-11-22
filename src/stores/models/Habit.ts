import { Instance, types } from "mobx-state-tree";

export const HabitCompletion = types.model("HabitCompletion", {
  id: types.optional(types.string, ""),
  date: types.optional(types.string, ""),
  createdAt: types.optional(types.string, ""),
});

const HabitModel = types.model("HabitModel", {
  id: types.optional(types.string, ""),
  title: types.optional(types.string, ""),
  completions: types.optional(types.array(HabitCompletion), []),
  createdAt: types.optional(types.string, ""),
  updatedAt: types.optional(types.string, ""),
});

interface IHabitModel extends Instance<typeof HabitModel> {}
interface IHabitCompletion extends Instance<typeof HabitCompletion> {}

export type { IHabitModel, IHabitCompletion };
export { HabitModel };
