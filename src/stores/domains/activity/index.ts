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

import { errorDev } from "@/helpers";

import { createHabit, getHabits, toggleHabit } from "@/api/requests/activity";

import {
  TCreateHabitRequest,
  THabitsResponse,
  TToggleHabitRequest,
} from "@/api/requests/activity/types";

const StoreActivity = types
  .model("StoreActivity", {
    habits: types.optional(types.array(HabitModel), []),
    isHabitsLoading: types.optional(types.boolean, false),
    isToggleHabitLoading: types.optional(types.boolean, false),
  })
  .actions((self) => {
    const setIsHabitsLoading = (value: boolean) => {
      self.isHabitsLoading = value;
    };

    const setIsToggleHabitLoading = (value: boolean) => {
      self.isToggleHabitLoading = value;
    };

    const setHabits = (value: SnapshotIn<typeof HabitModel>[]) => {
      applySnapshot(self.habits, value);
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

    const createNewHabit = flow(function* (data: TCreateHabitRequest) {
      setIsHabitsLoading(true);

      try {
        const response: THabitsResponse = yield createHabit(data);

        console.log(response);
      } catch (error) {
        if (error instanceof AxiosError) {
          errorDev("createNewHabit", error.response);
        }
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
      getWeekCompletions,
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
