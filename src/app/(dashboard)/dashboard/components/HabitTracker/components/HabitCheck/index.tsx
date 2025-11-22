import { observer } from "mobx-react-lite";

import styles from "./styles/index.module.scss";

interface IProps {
  completed: boolean;
  onClick: () => void;
}

export const HabitCheck = observer(
  ({ completed = false, onClick = () => {} }: IProps) => {
    return (
      <div
        className={`${styles.checkbox} ${
          completed ? styles.checkbox_completed : ""
        }`}
        onClick={onClick}
      >
        {completed && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    );
  }
);
