import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Block } from "@/components/Block";
import { Button } from "@/components/Button";
import { QuestionModal } from "@/components/Modals/QuestionModal";
import { AddHabitModal } from "@/components/Modals/AddHabitModal";
import { WeekCompletion } from "./components/WeekCompletion";
import { HabitsBody } from "./components/HabitsBody";

import { WEEK_DAYS } from "@/constants";

import { getActiveDay } from "@/helpers";

import { useStoreActivity } from "@/stores/domains/activity";

import styles from "./styles/index.module.scss";

export const HabitTracker = observer(() => {
  const {
    getAllHabits,
    habits,
    isDeleteHabitModalOpen,
    onDeleteHabit,
    onCloseDeleteHabitModal,
    habitToDeleteId,
    isDeleteHabitLoading,
    onOpenAddHabitModal,
    onCompleteDay,
    isCompleteDayLoading,
    isActiveDayAllCompleted,
    isActiveDayAlreadySubmitted,
  } = useStoreActivity();

  const isCompleteDayDisabled =
    isCompleteDayLoading ||
    !isActiveDayAllCompleted ||
    isActiveDayAlreadySubmitted;

  useEffect(() => {
    getAllHabits();
  }, []);

  return (
    <>
      <Block
        title="Weekly Habit Tracker"
        description="Track your daily habits and build consistency"
        className={styles.habitTracker}
      >
        <div className={styles.habitTracker__options}>
          <Button
            title="Complete Day"
            onClick={() => onCompleteDay(getActiveDay())}
            isLoading={isCompleteDayDisabled}
            className={styles.habitTracker__completeDayButton}
          />
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
              <HabitsBody />
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
