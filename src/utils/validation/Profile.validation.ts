export const validateProfile = (form: any) => {
  const errors: any = {};

  if (!form.firstName?.trim()) {
    errors.firstName = "First name required";
  }

  if (!form.lastName?.trim()) {
    errors.lastName = "Last name required";
  }

  if (!form.email?.trim()) {
    errors.email = "Email required";
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "Invalid email";
  }

  if (!form.phone?.trim()) {
    errors.phone = "Phone required";
  } else if (!/^[0-9]{10}$/.test(form.phone)) {
    errors.phone = "Invalid phone number";
  }

  return errors;
};