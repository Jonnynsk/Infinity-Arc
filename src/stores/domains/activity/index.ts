import {
  applySnapshot,
  flow,
  Instance,
  SnapshotIn,
  types,
} from "mobx-state-tree";
import { AxiosError } from "axios";

import {
  HabitModel,
  IHabitCompletion,
  IHabitModel,
} from "@/stores/models/Habit";
import { InputModel } from "@/stores/models/Input";

import { errorDev } from "@/helpers";

import {
  createHabit,
  deleteHabit,
  getHabits,
  toggleHabit,
} from "@/api/requests/activity";

import {
  TCreateHabitRequest,
  THabitsResponse,
  TToggleHabitRequest,
} from "@/api/requests/activity/types";
import z from "zod";
import { requiredField } from "@/helpers/validation";

const habitNameSchema = requiredField();

const StoreActivity = types
  .model("StoreActivity", {
    habits: types.optional(types.array(HabitModel), []),
    isHabitsLoading: types.optional(types.boolean, false),
    isToggleHabitLoading: types.optional(types.boolean, false),
    isDeleteHabitLoading: types.optional(types.boolean, false),
    isDeleteHabitModalOpen: types.optional(types.boolean, false),
    habitToDeleteId: types.optional(types.string, ""),

    isAddHabitModalOpen: types.optional(types.boolean, false),
    isAddHabitLoading: types.optional(types.boolean, false),
    habitName: types.optional(InputModel, {}),
  })
  .actions((self) => {
    const setIsHabitsLoading = (value: boolean) => {
      self.isHabitsLoading = value;
    };

    const setHabitToDeleteId = (id: string) => {
      self.habitToDeleteId = id;
    };

    const setIsToggleHabitLoading = (value: boolean) => {
      self.isToggleHabitLoading = value;
    };

    const setIsDeleteHabitLoading = (value: boolean) => {
      self.isDeleteHabitLoading = value;
    };

    const setIsAddHabitLoading = (value: boolean) => {
      self.isAddHabitLoading = value;
    };

    const setIsAddHabitModalOpen = (value: boolean) => {
      self.isAddHabitModalOpen = value;
    };

    const onOpenAddHabitModal = () => {
      setIsAddHabitModalOpen(true);
    };

    const onCloseAddHabitModal = () => {
      self.habitName.setValue("");
      self.habitName.setErrors([]);
      setIsAddHabitModalOpen(false);
    };

    const setIsDeleteHabitModalOpen = (value: boolean) => {
      self.isDeleteHabitModalOpen = value;
    };

    const onOpenDeleteHabitModal = (id: string) => {
      setHabitToDeleteId(id);
      setIsDeleteHabitModalOpen(true);
    };

    const onCloseDeleteHabitModal = () => {
      setIsDeleteHabitModalOpen(false);
    };

    const setHabits = (value: SnapshotIn<typeof HabitModel>[]) => {
      applySnapshot(self.habits, value);
    };

    const onChangeHabitName = (value: string) => {
      self.habitName.setErrors([]);
      self.habitName.setValue(value);
    };

    const validationHabitName = () => {
      const result = habitNameSchema.safeParse(self.habitName.value);

      self.habitName.setErrors(
        result.success ? [] : result.error.issues.map((issue) => issue.message)
      );

      return result.success;
    };

    const getAllHabits = flow(function* () {
      setIsHabitsLoading(true);

      try {
        const response: THabitsResponse[] = yield getHabits();

        if (response) {
          setHabits(response);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("getAllHabits", error.response);
        }
      } finally {
        setIsHabitsLoading(false);
      }
    });

    const createNewHabit = flow(function* () {
      if (!validationHabitName()) {
        return;
      }

      setIsAddHabitLoading(true);

      try {
        const response: THabitsResponse = yield createHabit({
          title: self.habitName.value,
        });

        if (response) {
          onCloseAddHabitModal();
          getAllHabits();
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("createNewHabit", error.response);
        }
      } finally {
        setIsAddHabitLoading(false);
      }
    });

    const onToggleHabit = flow(function* (data: TToggleHabitRequest) {
      setIsToggleHabitLoading(true);

      try {
        const response: THabitsResponse = yield toggleHabit(data);

        if (response) {
          const habitIndex = self.habits.findIndex(
            (habit) => habit.id === response.id
          );
          if (habitIndex !== -1) {
            applySnapshot(self.habits[habitIndex], response);
          }
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("onToggleHabit", error.response);
        }
      } finally {
        setIsToggleHabitLoading(false);
      }
    });

    const onDeleteHabit = flow(function* (id: string) {
      setIsDeleteHabitLoading(true);

      try {
        const response: THabitsResponse = yield deleteHabit(id);

        if (response) {
          onCloseDeleteHabitModal();
          getAllHabits();
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("onDeleteHabit", error.response);
        }
      } finally {
        setIsDeleteHabitLoading(false);
      }
    });

    const getWeekDates = () => {
      const now = new Date();
      const dayOfWeek = now.getDay();
      const monday = new Date(now);
      monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

      const dates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        dates.push(`${year}-${month}-${day}`);
      }
      return dates;
    };

    const getWeekCompletions = (habit: IHabitModel) => {
      const weekDates = getWeekDates();
      const result = [];

      for (let i = 0; i < 7; i++) {
        const existingCompletion = habit.completions.find(
          (completion: IHabitCompletion) =>
            completion.date.split("T")[0] === weekDates[i]
        );

        if (existingCompletion) {
          result.push({ ...existingCompletion, completed: true });
        } else {
          result.push({
            id: `${habit.id}-${i}`,
            date: weekDates[i],
            completed: false,
          });
        }
      }
      return result;
    };

    return {
      getAllHabits,
      createNewHabit,
      onToggleHabit,
      onDeleteHabit,
      getWeekCompletions,
      onOpenDeleteHabitModal,
      onCloseDeleteHabitModal,
      onOpenAddHabitModal,
      onCloseAddHabitModal,
      onChangeHabitName,
      getWeekDates,
    };
  })
  .views((self) => {
    return {
      get inputHabitNameHandler() {
        return {
          value: self.habitName.value,
          onChange: self.onChangeHabitName,
          errors: self.habitName.errors,
        };
      },
      get weekCompletionPercentage() {
        if (self.habits.length === 0) {
          return 0;
        }

        const weekDates = self.getWeekDates();
        let completedCount = 0;
        let totalCount = 0;

        self.habits.forEach((habit) => {
          weekDates.forEach((date) => {
            totalCount++;
            const isCompleted = habit.completions.some(
              (completion: IHabitCompletion) =>
                completion.date.split("T")[0] === date
            );
            if (isCompleted) {
              completedCount++;
            }
          });
        });

        return totalCount === 0
          ? 0
          : Math.round((completedCount / totalCount) * 100);
      },
    };
  });

interface IStoreActivity extends Instance<typeof StoreActivity> {}
interface IStoreActivitySnapshotIn extends SnapshotIn<typeof StoreActivity> {}

let store: IStoreActivity;

function useStoreActivity(snapshot?: IStoreActivitySnapshotIn): IStoreActivity {
  if (!store) {
    store = StoreActivity.create();
  }

  if (snapshot) {
    applySnapshot(store, snapshot);
  }

  return store;
}

export { StoreActivity, useStoreActivity };
export type { IStoreActivity, IStoreActivitySnapshotIn };
