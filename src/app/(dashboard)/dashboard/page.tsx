"use client";

import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";

import { Button } from "@/components/Button";

import { ROUTES } from "@/constants/routes";

import { useStoreAuthorization } from "@/stores/domains/authorization";

import styles from "./styles/index.module.scss";

const Dashboard = observer(() => {
  const router = useRouter();
  const { authLogout, isLogoutLoading } = useStoreAuthorization();

  const onLogoutAccount = () => {
    authLogout().then(() => {
      router.push(ROUTES.HOME);
    });
  };

  return (
    <div className={styles.dashboard}>
      <Button
        title="Exit"
        onClick={onLogoutAccount}
        isLoading={isLogoutLoading}
      />
    </div>
  );
});

export default Dashboard;
