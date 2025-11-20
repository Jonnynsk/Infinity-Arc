import { useState } from "react";
import clsx from "clsx";

import EyeIcon from "@/public/icons/eye.svg";

import { InputType } from "@/constants";

import styles from "./styles/index.module.scss";

interface IProps {
  type?: InputType;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  error?: string;
  isGray?: boolean;
  isTextarea?: boolean;
  className?: string;
}

export const Input = ({
  type = "text" as InputType,
  placeholder = "",
  value = "",
  onChange = () => {},
  label = "",
  error = "",
  isGray = false,
  isTextarea = false,
  className = "",
}: IProps) => {
  const [inputType, setInputType] = useState(type);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e.target.value);
  };

  const handleTogglePassword = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className={clsx(styles.inputBlock, className)}>
      <label className={styles.inputBlock__label}>{label}</label>
      <div className={styles.inputBlock__inputWrapper}>
        {isTextarea ? (
          <textarea
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            className={clsx(
              styles.inputBlock__input,
              isGray && styles.inputBlock__input_gray,
              isTextarea && styles.inputBlock__textarea
            )}
          />
        ) : (
          <input
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            className={clsx(
              styles.inputBlock__input,
              isGray && styles.inputBlock__input_gray
            )}
          />
        )}
        {type === "password" && (
          <button
            type="button"
            className={styles.inputBlock__eye}
            onClick={handleTogglePassword}
          >
            <EyeIcon width={20} height={20} />
          </button>
        )}
      </div>
      <span className={styles.inputBlock__error}>{error}</span>
    </div>
  );
};
