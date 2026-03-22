export type LoginErrors = {
  email?: string;
  password?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLogin = (data: {
  email: string;
  password: string;
}): LoginErrors => {
  const errors: LoginErrors = {};

  // Email
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Invalid email address";
  }

  // Password
  if (!data.password.trim()) {
    errors.password = "Password is required";
  }

  return errors;
};
