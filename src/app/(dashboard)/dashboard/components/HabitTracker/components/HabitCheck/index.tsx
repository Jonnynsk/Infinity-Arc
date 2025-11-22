import { observer } from "mobx-react-lite";
import clsx from "clsx";

import styles from "./styles/index.module.scss";

interface IProps {
  completed: boolean;
  onClick: () => void;
  isLoading?: boolean;
}

export const HabitCheck = observer(
  ({ completed = false, onClick = () => {}, isLoading = false }: IProps) => {
    return (
      <button
        className={clsx(styles.checkbox, {
          [styles.checkbox_completed]: completed,
        })}
        onClick={onClick}
        disabled={isLoading}
        type="button"
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
      </button>
    );
  }
);
