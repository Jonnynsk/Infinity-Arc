import { observer } from "mobx-react-lite";

import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import { useStoreActivity } from "@/stores/domains/activity";

import styles from "./styles/index.module.scss";

export const AddHabitModal = observer(() => {
  const {
    isAddHabitModalOpen,
    onCloseAddHabitModal,
    inputHabitNameHandler,
    isAddHabitLoading,
    createNewHabit,
  } = useStoreActivity();

  return (
    <Modal visible={isAddHabitModalOpen} onClose={onCloseAddHabitModal}>
      <div className={styles.addHabitModal}>
        <div className={styles.addHabitModal__content}>
          <h2 className={styles.addHabitModal__title}>Add New Habit</h2>
          <Input
            label="Habit Name"
            placeholder="Enter habit name"
            value={inputHabitNameHandler.value}
            onChange={inputHabitNameHandler.onChange}
            error={inputHabitNameHandler.errors[0]}
            className={styles.addHabitModal__input}
          />
        </div>
        <div className={styles.addHabitModal__buttons}>
          <Button
            title="Cancel"
            onClick={onCloseAddHabitModal}
            className={styles.addHabitModal__button}
            variant="secondary"
          />
          <Button
            title="Add Habit"
            onClick={createNewHabit}
            className={styles.addHabitModal__button}
            isLoading={isAddHabitLoading}
            variant="success"
          />
        </div>
      </div>
    </Modal>
  );
});
