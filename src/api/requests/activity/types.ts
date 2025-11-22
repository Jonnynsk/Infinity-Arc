import z from "zod";

export const HabitCompletion = z.object({
  id: z.string(),
  date: z.string(),
  createdAt: z.string(),
});
export type THabitCompletion = z.infer<typeof HabitCompletion>;

export const HabitsResponse = z.object({
  completions: z.array(HabitCompletion),
  createdAt: z.string(),
  id: z.string(),
  title: z.string(),
  updatedAt: z.string(),
});
export type THabitsResponse = z.infer<typeof HabitsResponse>;

export const CreateHabitRequest = z.object({
  title: z.string(),
});
export type TCreateHabitRequest = z.infer<typeof CreateHabitRequest>;

export const ToggleHabitRequest = z.object({
  habitId: z.string(),
  date: z.string(),
});
export type TToggleHabitRequest = z.infer<typeof ToggleHabitRequest>;
