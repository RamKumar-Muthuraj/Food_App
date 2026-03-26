export interface AddressForm {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export const validateAddress = (form: AddressForm) => {
  const errors: Partial<Record<keyof AddressForm, string>> = {};

  if (!form.street?.trim()) {
    errors.street = "Street is required";
  }

  if (!form.city?.trim()) {
    errors.city = "City is required";
  }

  if (!form.state?.trim()) {
    errors.state = "State is required";
  }

  if (!form.zip?.trim()) {
    errors.zip = "PIN code is required";
  } else if (!/^[0-9]{6}$/.test(form.zip)) {
    errors.zip = "Invalid PIN code";
  }

  if (!form.country?.trim()) {
    errors.country = "Country is required";
  }

  return errors;
};