export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
};

export const PAGE_CONTENT = {
  "/dashboard": {
    title: "Welcome back, <name>!",
    description: "Keep pushing. Every day counts.",
  },
  "/community": {
    title: "Community",
    description: "Connect with warriors worldwide.",
  },
  "/profile": {
    title: "Profile",
    description: "Manage your account information.",
  },
  "/settings": {
    title: "Settings",
    description: "Customize your settings.",
  },
} as const;

export const DASHBOARD_ROUTES = ["/dashboard", "/profile", "/settings", "/community"];
