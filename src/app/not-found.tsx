"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/Button";

import { ROUTES } from "@/constants/routes";

import NotFoundImage from "@/public/images/404.png";

import styles from "./not-found.module.scss";

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push(ROUTES.HOME);
  };

  return (
    <div className={styles.notFound}>
      <div className={styles.notFound__neon}>
        <Image src={NotFoundImage} alt="Not found" width={175} height={100} />
      </div>
      <h1 className={styles.notFound__title}>Path not found</h1>
      <h2 className={styles.notFound__subtitle}>
        The warrior has lost his way
      </h2>
      <p className={styles.notFound__description}>
        This path leads nowhere. Even the strongest warriors sometimes take
        wrong turns. Regroup, refocus, and return to your path.
      </p>
      <div className={styles.notFound__buttons}>
        <Button title="Go back" variant="primary" onClick={handleGoBack} />
        <Button title="Home" variant="secondary" onClick={handleGoHome} />
      </div>
    </div>
  );
}
