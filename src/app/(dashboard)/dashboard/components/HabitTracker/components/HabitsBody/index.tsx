import { observer } from "mobx-react-lite";

import { HabitCheck } from "../HabitCheck";

import { getActiveDay, isEditableDay } from "@/helpers";

import DeleteIcon from "@/public/icons/delete.svg";

import { useStoreActivity } from "@/stores/domains/activity";

import styles from "./styles/index.module.scss";

export const HabitsBody = observer(() => {
  const {
    getAllHabits,
    habits,
    onToggleHabit,
    getWeekCompletions,
    onOpenDeleteHabitModal,
    isToggleHabitLoading,
    isActiveDayAlreadySubmitted,
  } = useStoreActivity();

  const handleToggleHabit = (habitId: string, date: string) => {
    onToggleHabit({ habitId, date }).then(() => {
      getAllHabits();
    });
  };

  return (
    <div className={styles.body}>
      {habits.map((habit) => (
        <div key={habit.id} className={styles.body__row}>
          <div className={styles.body__habitCell}>
            <div className={styles.body__habitName}>
              <p className={styles.body__habitNameText}>{habit.title}</p>{" "}
              <DeleteIcon
                className={styles.body__deleteIcon}
                onClick={() => onOpenDeleteHabitModal(habit.id)}
              />
            </div>
          </div>
          {getWeekCompletions(habit).map((completion, index) => {
            const canEdit = isEditableDay(completion.date);
            const isSubmittedDay =
              isActiveDayAlreadySubmitted &&
              completion.date.split("T")[0] === getActiveDay();

            return (
              <div
                key={completion.id || index}
                className={styles.body__dayCell}
              >
                <HabitCheck
                  completed={completion.completed}
                  isLoading={isToggleHabitLoading}
                  disabled={!canEdit || isSubmittedDay}
                  onClick={() => handleToggleHabit(habit.id, completion.date)}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
});
