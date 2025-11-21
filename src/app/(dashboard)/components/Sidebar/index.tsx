"use client";

import { observer } from "mobx-react-lite";
import { usePathname, useRouter } from "next/navigation";

import { LogoBlock } from "@/components/Header/components/LogoBlock";
import { SidebarInfo } from "./components/SidebarInfo";
import { SidebarLink } from "./components/SidebarLink";

import { DASHBOARD_LINKS } from "@/constants";
import { ROUTES } from "@/constants/routes";

import LogoutIcon from "@/public/icons/sidebar/logout.svg";

import { useStoreAuthorization } from "@/stores/domains/authorization";

import styles from "./styles/index.module.scss";

export const Sidebar = observer(() => {
  const pathname = usePathname();
  const router = useRouter();
  const { authLogout, isLogoutLoading } = useStoreAuthorization();

  const onLogoutAccount = () => {
    authLogout().then(() => {
      router.push(ROUTES.HOME);
    });
  };

  return (
    <div className={styles.sidebar}>
      <LogoBlock className={styles.sidebar__logo} />
      <SidebarInfo className={styles.sidebar__info} />
      <nav className={styles.sidebar__nav}>
        <ul className={styles.sidebar__links}>
          {DASHBOARD_LINKS.map((link) => (
            <SidebarLink
              key={link.href}
              link={link.title}
              onClick={() => router.push(link.href)}
              icon={<link.icon />}
              isActive={pathname === link.href}
            />
          ))}
        </ul>
      </nav>
      <SidebarLink
        link="Logout"
        onClick={onLogoutAccount}
        icon={<LogoutIcon />}
        className={styles.sidebar__logout}
        disabled={isLogoutLoading}
      />
    </div>
  );
});
