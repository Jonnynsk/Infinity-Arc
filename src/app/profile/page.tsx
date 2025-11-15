"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";

import { ROUTES } from "@/constants/routes";

import { useStoreAuthorization } from "@/stores/domains/authorization";

export default function Profile() {
  const router = useRouter();
  const { authLogout, isLogoutLoading } = useStoreAuthorization();

  const onLogoutAccount = () => {
    authLogout().then(() => {
      router.push(ROUTES.HOME);
    });
  };

  return (
    <div>
      <Button
        title="Exit"
        onClick={onLogoutAccount}
        isLoading={isLogoutLoading}
      />
    </div>
  );
}
