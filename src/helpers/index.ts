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
    return `${diffInMinutes}m`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h`;
  } else {
    return format(postDate, "dd MMM");
  }
};
