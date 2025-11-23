import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Block } from "@/components/Block";
import { Button } from "@/components/Button";
import { HabitCheck } from "./components/HabitCheck";
import { QuestionModal } from "@/components/Modals/QuestionModal";
import { AddHabitModal } from "@/components/Modals/AddHabitModal";
import { WeekCompletion } from "./components/WeekCompletion";

import { WEEK_DAYS } from "@/constants";

import DeleteIcon from "@/public/icons/delete.svg";

import { useStoreActivity } from "@/stores/domains/activity";

import styles from "./styles/index.module.scss";

export const HabitTracker = observer(() => {
  const {
    getAllHabits,
    habits,
    onToggleHabit,
    getWeekCompletions,
    isDeleteHabitModalOpen,
    onDeleteHabit,
    onCloseDeleteHabitModal,
    onOpenDeleteHabitModal,
    habitToDeleteId,
    isDeleteHabitLoading,
    isToggleHabitLoading,
    onOpenAddHabitModal,
  } = useStoreActivity();

  useEffect(() => {
    getAllHabits();
  }, []);

  const handleToggleHabit = (habitId: string, date: string) => {
    onToggleHabit({ habitId, date }).then(() => {
      getAllHabits();
    });
  };

  return (
    <>
      <Block
        title="Weekly Habit Tracker"
        description="Track your daily habits and build consistency"
        className={styles.habitTracker}
      >
        <div className={styles.habitTracker__addHabit}>
          <WeekCompletion />
          <Button title="+ Add Habit" onClick={onOpenAddHabitModal} />
        </div>
        <div className={styles.habitTracker__table}>
          {Boolean(habits.length) ? (
            <>
              <div className={styles.habitTracker__header}>
                <div className={styles.habitTracker__cell}>Habit</div>
                {WEEK_DAYS.map((day) => (
                  <div key={day} className={styles.habitTracker__cell}>
                    {day}
                  </div>
                ))}
              </div>
              <div className={styles.habitTracker__body}>
                {habits.map((habit) => (
                  <div key={habit.id} className={styles.habitTracker__row}>
                    <div className={styles.habitTracker__habitCell}>
                      <div className={styles.habitTracker__habitName}>
                        <p className={styles.habitTracker__habitNameText}>
                          {habit.title}
                        </p>{" "}
                        <DeleteIcon
                          className={styles.habitTracker__deleteIcon}
                          onClick={() => onOpenDeleteHabitModal(habit.id)}
                        />
                      </div>
                    </div>

                    {getWeekCompletions(habit).map((completion, index) => (
                      <div
                        key={completion.id || index}
                        className={styles.habitTracker__dayCell}
                      >
                        <HabitCheck
                          completed={completion.completed}
                          isLoading={isToggleHabitLoading}
                          onClick={() =>
                            handleToggleHabit(habit.id, completion.date)
                          }
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.habitTracker__empty}>No habits yet</div>
          )}
        </div>
      </Block>
      <QuestionModal
        visible={isDeleteHabitModalOpen}
        onConfirm={() => onDeleteHabit(habitToDeleteId)}
        onClose={onCloseDeleteHabitModal}
        isLoading={isDeleteHabitLoading}
        title="Delete Habit?"
        description={`Are you sure you want to delete this habit? <br /> 
          This action cannot be undone.`}
      />
      <AddHabitModal />
    </>
  );
});
