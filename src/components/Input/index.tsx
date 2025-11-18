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
}

export const Input = ({
  type = "text" as InputType,
  placeholder = "",
  value = "",
  onChange = () => {},
  label = "",
  error = "",
  isGray = false,
}: IProps) => {
  const [inputType, setInputType] = useState(type);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleTogglePassword = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className={styles.inputBlock}>
      <label className={styles.inputBlock__label}>{label}</label>
      <div className={styles.inputBlock__inputWrapper}>
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
