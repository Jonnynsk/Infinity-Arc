import clsx from "clsx";

import styles from "./styles/index.module.scss";

interface ITab {
  title: string;
  id: number;
}

interface IProps {
  listTabs: ITab[];
  activeTab: number;
  setActiveTab: (id: number) => void;
  className?: string;
}

export const Tabs = ({
  listTabs = [],
  activeTab = 0,
  setActiveTab = () => {},
  className = "",
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
            styles.tabs__tab,
            activeTab === tab.id && styles.tabs__tabActive
          )}
          onClick={() => handleClick(tab.id)}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};
