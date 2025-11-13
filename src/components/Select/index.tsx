"use client";

import { useState, useRef, useEffect } from "react";

import styles from "./styles/index.module.scss";

interface IProps {
  options: {
    value: string;
    label: string;
  }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  isCountry?: boolean;
  error?: string;
}

export const Select = ({
  options,
  value = "",
  onChange = () => {},
  placeholder = "Select...",
  label = "",
  isCountry = false,
  error = "",
}: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.selectBlock} ref={selectRef}>
      {label && <label className={styles.selectBlock__label}>{label}</label>}
      <div
        className={`${styles.selectBlock__select} ${
          isOpen ? styles.selectBlock__select_open : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`${styles.selectBlock__value} ${
            !selectedOption ? styles.selectBlock__value_placeholder : ""
          }`}
        >
          {selectedOption ? (
            <div className={styles.selectBlock__value_selected}>
              <img
                src={`https://flagcdn.com/w20/${selectedValue.toLowerCase()}.png`}
                alt={selectedOption.label}
                width={20}
                height={15}
              />
              {selectedOption.label}
            </div>
          ) : (
            placeholder
          )}
        </span>
        <span
          className={`${styles.selectBlock__arrow} ${
            isOpen ? styles.selectBlock__arrow_open : ""
          }`}
        >
          ▼
        </span>
      </div>
      <span className={styles.selectBlock__error}>{error}</span>
      {isOpen && (
        <div className={styles.selectBlock__dropdown}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.selectBlock__option} ${
                option.value === selectedValue
                  ? styles.selectBlock__option_selected
                  : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {isCountry && (
                <img
                  src={`https://flagcdn.com/w20/${option.value.toLowerCase()}.png`}
                  alt={option.label}
                  width={20}
                  height={15}
                />
              )}
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
