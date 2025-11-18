import { observer } from "mobx-react-lite";
import clsx from "clsx";

import styles from "./styles/index.module.scss";

interface IProps {
  link: string;
  isActive?: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const SidebarLink = observer(
  ({
    link = "",
    isActive = false,
    onClick = () => {},
    icon,
    className = "",
    disabled = false,
  }: IProps) => {
    return (
      <li
        className={clsx(styles.link, className, {
          [styles.link__linkActive]: isActive,
          [styles.link__disabled]: disabled,
        })}
        onClick={onClick}
        aria-disabled={disabled}
      >
        {icon}
        {link}
      </li>
    );
  }
);
