import countries from "world-countries";

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
