"use client";

import { useEffect } from "react";

import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";

import { useStoreUsers } from "@/stores/domains/users";

import styles from "./layout.module.scss";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getMyProfile } = useStoreUsers();

  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.dashboard__content}>
        <Header />
        <div className={styles.dashboard__children}>{children}</div>
      </div>
    </div>
  );
}
