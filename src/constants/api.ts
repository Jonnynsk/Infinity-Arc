// Auth
export const API_AUTH_REGISTER = "auth/register";
export const API_AUTH_LOGIN = "auth/login";
export const API_AUTH_LOGOUT = "auth/logout";
export const API_AUTH_REFRESH = "auth/refresh";
export const API_AUTH_CHANGE_PASSWORD = "auth/change-password";
export const API_AUTH_DELETE_ACCOUNT = "auth/delete-account";

// Users
export const API_USERS_PROFILE = "users/profile";

// Activity
export const API_ACTIVITY_HABITS = "activity/habits";
export const API_ACTIVITY_HABIT_TOGGLE = "activity/habits/toggle";
export const API_ACTIVITY_HABIT_DELETE = (habitId: string) =>
  `activity/habits/${habitId}`;
