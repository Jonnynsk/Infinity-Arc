import Image from "next/image";
import clsx from "clsx";

import IconCheck from "@/public/icons/check.svg";

import styles from "./styles/index.module.scss";

interface IProps {
  text?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const CheckBox = ({
  text = "",
  checked = false,
  onChange = () => {},
  className = "",
}: IProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div className={clsx(styles.checkbox, className)}>
      <label className={styles.checkbox__label}>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className={styles.checkbox__input}
        />
        <span className={styles.checkbox__checked}>
          {checked && (
            <Image src={IconCheck} alt="Check" width={16} height={16} />
          )}
        </span>
      </label>
      {text && <span className={styles.checkbox__text}>{text}</span>}
    </div>
  );
};
