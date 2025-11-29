import DashboardIcon from "@/public/icons/sidebar/dashboard.svg";
import CommunityIcon from "@/public/icons/sidebar/community.svg";
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
    title: "Community",
    href: "/community",
    icon: CommunityIcon,
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
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const PROFILE_TABS = {
  POSTS: 0,
  ABOUT: 1,
  SAVED: 2,
} as const;
export type ProfileTab = (typeof PROFILE_TABS)[keyof typeof PROFILE_TABS];

export const enum SocialStatsTitles {
  FOLLOWERS = "Followers",
  FOLLOWING = "Following",
  POSTS = "Posts",
  LIKES_RECEIVED = "Likes Received",
  COMMENTS = "Comments",
}
export type TSocialStatsTitles =
  (typeof SocialStatsTitles)[keyof typeof SocialStatsTitles];

export const MAX_TEXTAREA_LENGTH = 1000;
