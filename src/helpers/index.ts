import countries from "world-countries";

export const getCountryOptions = () =>
  countries
    .map((country) => ({
      value: country.cca2,
      label: country.name.common,
    }))
    .sort((a, b) => a.label.localeCompare(b.label, "en"));
