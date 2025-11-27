import clsx from "clsx";

import styles from "./styles/index.module.scss";

interface ITab {
  title: string;
  id: number;
  icon?: React.ComponentType;
}

interface IProps {
  listTabs: ITab[];
  activeTab: number;
  setActiveTab: (id: number) => void;
  className?: string;
  classNameTab?: string;
}

export const Tabs = ({
  listTabs = [],
  activeTab = 0,
  setActiveTab = () => {},
  className = "",
  classNameTab = "",
}: IProps) => {
  const handleClick = (id: number) => {
    setActiveTab(id);
  };

  return (
    <div className={clsx(styles.tabs, className)}>
      {listTabs.map((tab) => (
        <button
          key={tab.id}
          className={clsx(
            classNameTab,
            styles.tabs__tab,
            activeTab === tab.id && styles.tabs__tabActive
          )}
          onClick={() => handleClick(tab.id)}
        >
          {tab.icon && (
            <span className={styles.tabs__icon}>
              <tab.icon />
            </span>
          )}
          {tab.title}
        </button>
      ))}
    </div>
  );
};
