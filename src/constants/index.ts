import DashboardIcon from "@/public/icons/sidebar/dashboard.svg";
import ProfileIcon from "@/public/icons/sidebar/profile.svg";
import SettingsIcon from "@/public/icons/sidebar/settings.svg";

export type ButtonType = "button" | "submit" | "reset";
export type InputType = "text" | "email" | "password";

export const DASHBOARD_LINKS = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: DashboardIcon,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: ProfileIcon,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: SettingsIcon,
  },
];

export const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
