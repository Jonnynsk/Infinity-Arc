import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Block } from "@/components/Block";
import { Button } from "@/components/Button";
import { HabitCheck } from "./components/HabitCheck";

import { useStoreActivity } from "@/stores/domains/activity";

import styles from "./styles/index.module.scss";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const HabitTracker = observer(() => {
  const {
    getAllHabits,
    createNewHabit,
    habits,
    onToggleHabit,
    getWeekCompletions,
  } = useStoreActivity();

  useEffect(() => {
    getAllHabits();
  }, []);

  const handleCreateHabit = () => {
    createNewHabit({ title: "Drink 3L Water" });
  };

  const handleToggleHabit = (habitId: string, date: string) => {
    onToggleHabit({ habitId, date }).then(() => {
      getAllHabits();
    });
  };

  return (
    <Block
      title="Weekly Habit Tracker"
      description="Track your daily habits and build consistency"
      className={styles.habitTracker}
    >
      <div className={styles.habitTracker__table}>
        <div className={styles.habitTracker__header}>
          <div className={styles.habitTracker__cell}>Habit</div>
          {DAYS.map((day) => (
            <div key={day} className={styles.habitTracker__cell}>
              {day}
            </div>
          ))}
        </div>

        <div className={styles.habitTracker__body}>
          {habits.map((habit) => (
            <div key={habit.id} className={styles.habitTracker__row}>
              <div className={styles.habitTracker__habitCell}>
                <span className={styles.habitTracker__habitName}>
                  {habit.title}
                </span>
              </div>

              {getWeekCompletions(habit).map((completion, index) => (
                <div
                  key={completion.id || index}
                  className={styles.habitTracker__dayCell}
                >
                  <HabitCheck
                    completed={completion.completed}
                    onClick={() => handleToggleHabit(habit.id, completion.date)}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Block>
  );
});
