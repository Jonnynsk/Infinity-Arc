"use client";

import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

import styles from "./styles/index.module.scss";

interface MenuOption {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

interface IProps {
  trigger: React.ReactNode;
  options: MenuOption[];
  className?: string;
  title?: string;
}

export const ButtonMenu = ({
  trigger,
  options = [],
  className = "",
  title = "",
}: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (onClick: () => void) => {
    onClick();
    setIsOpen(false);
  };

  return (
    <div className={clsx(styles.buttonMenu, className)} ref={menuRef}>
      <div
        onClick={handleToggle}
        className={styles.buttonMenu__trigger}
        title={title}
      >
        {trigger}
      </div>
      {isOpen && (
        <div className={styles.buttonMenu__menu}>
          {options.map((option, index) => (
            <button
              key={index}
              className={styles.buttonMenu__option}
              onClick={() => handleOptionClick(option.onClick)}
              disabled={option.isLoading}
            >
              {option.icon && (
                <span className={styles.buttonMenu__icon}>{option.icon}</span>
              )}
              <span className={styles.buttonMenu__label}>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
