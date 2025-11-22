import { instance } from "@/api/instance";
import {
  API_ACTIVITY_HABITS,
  API_ACTIVITY_HABIT_DELETE,
  API_ACTIVITY_HABIT_TOGGLE,
} from "@/constants/api";

import {
  TCreateHabitRequest,
  THabitsResponse,
  TToggleHabitRequest,
} from "./types";

export const getHabits = async () => {
  return await instance
    .get<THabitsResponse[]>(API_ACTIVITY_HABITS)
    .then((res) => res.data);
};

export const createHabit = async (data: TCreateHabitRequest) => {
  return await instance
    .post<THabitsResponse[]>(API_ACTIVITY_HABITS, data)
    .then((res) => res.data);
};

export const toggleHabit = async (data: TToggleHabitRequest) => {
  return await instance
    .post<THabitsResponse[]>(API_ACTIVITY_HABIT_TOGGLE, data)
    .then((res) => res.data);
};

export const deleteHabit = async (id: string) => {
  return await instance
    .delete<THabitsResponse[]>(API_ACTIVITY_HABIT_DELETE(id))
    .then((res) => res.data);
};
