"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { observer } from "mobx-react-lite";

import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";

import { DASHBOARD_ROUTES } from "@/constants/routes";

import { useStoreUsers } from "@/stores/domains/users";

import styles from "./layout.module.scss";

const DashboardLayout = observer(
  ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const { getMyProfile, userNotFound } = useStoreUsers();
    const pathname = usePathname();

    const isValidRoute = DASHBOARD_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(route + "/")
    );

    const isDynamicUserRoute = pathname.match(/^\/[a-zA-Z0-9_-]+$/) !== null;

    const showLayout = isValidRoute || (isDynamicUserRoute && !userNotFound);

    useEffect(() => {
      getMyProfile();
    }, []);

    return (
      <div className={styles.dashboard}>
        {showLayout && <Sidebar />}
        <div className={styles.dashboard__content}>
          {showLayout && <Header />}
          <div className={styles.dashboard__children}>{children}</div>
        </div>
      </div>
    );
  }
);

export default DashboardLayout;
