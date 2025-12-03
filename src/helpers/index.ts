import countries from "world-countries";
import { format } from "date-fns";

export const getCountryOptions = () =>
  countries
    .map((country) => ({
      value: country.cca2,
      label: country.name.common,
    }))
    .sort((a, b) => a.label.localeCompare(b.label, "en"));

export const errorDev = (title: string, error: unknown) => {
  const env = process.env.NODE_ENV;
  if (env === "development") {
    console.log(title, error);
  }
};

// Get country name from country code (RU -> Russia)
export const getCountryName = (countryCode: string): string => {
  if (!countryCode) return "";

  const country = countries.find(
    (c) => c.cca2.toLowerCase() === countryCode.toLowerCase()
  );

  return country?.name.common || "";
};

// Date format "month year" (April 2022)
export const monthYearFormat = (date: string) => {
  if (!date) return "";
  return format(new Date(date), "MMMM yyyy");
};

// Date format "weekday, month day, year" (Saturday, November 21, 2025)
export const currentDateFormat = () => {
  return format(new Date(), "EEEE, MMMM d, yyyy");
};

// Comma after thousand in a number (1000 -> 1,000)
export const commaInNumber = (num: number) => {
  return String(num).replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ",");
};

// Post date format
export const postDateFormat = (date: string | Date): string => {
  if (!date) return "";

  const postDate = new Date(date);
  const now = new Date();
  const diffInMs = now.getTime() - postDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  if (diffInMinutes < 1) {
    return "just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    return format(postDate, "dd MMM");
  }
};

// Get today's date in YYYY-MM-DD format
export const getTodayDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Format date to YYYY-MM-DD
const formatDateToString = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

// Check if date is editable (today + yesterday until 3:00 AM)
export const isEditableDay = (completionDate: string): boolean => {
  const now = new Date();
  const targetDate = completionDate.split("T")[0];
  const todayStr = getTodayDate();

  // Until 3:00 AM, you can edit today and yesterday
  if (now.getHours() < 3) {
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = formatDateToString(yesterday);
    return targetDate === todayStr || targetDate === yesterdayStr;
  }

  return targetDate === todayStr;
};

// Get active day for completing (yesterday if before 3:00 AM, today otherwise)
export const getActiveDay = (): string => {
  const now = new Date();

  if (now.getHours() < 3) {
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    return formatDateToString(yesterday);
  }

  return getTodayDate();
};
