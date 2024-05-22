import { createCountry } from "./createCountry";
import { getCountries } from "./getCountries";
import { updateCountry } from "./updateCountry";
import { deleteCountry } from "./deleteCountry";

const CountryController = {
  createCountry,
  getCountries,
  updateCountry,
  deleteCountry,
};

export default CountryController;
