import { useState } from "react";
import Image from "next/image";

import EyeIcon from "@/public/icons/eye.svg";

import styles from "./styles/index.module.scss";

interface IProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  error?: string;
}

export const Input = ({
  type = "text",
  placeholder = "",
  value = "",
  onChange = () => {},
  label = "",
  error = "",
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
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={styles.inputBlock__input}
      />
      <span className={styles.inputBlock__error}>{error}</span>
      {type === "password" && (
        <button
          className={styles.inputBlock__eye}
          onClick={handleTogglePassword}
        >
          <Image src={EyeIcon} alt="toggle" width={20} height={20} />
        </button>
      )}
    </div>
  );
};
