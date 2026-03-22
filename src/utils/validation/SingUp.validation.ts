import { LoginFieldProps } from "@/types/Login.types";

export type SignUpErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  is_termsCheck?: boolean;
};

// 🔥 Regex Patterns
const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/; // Indian standard (10 digits)
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
// Min 6 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char

export const validateSignUp = (data: LoginFieldProps): SignUpErrors => {
  const errors: SignUpErrors = {};
  const firstName = data.firstName.trim();
  const lastName = data.lastName.trim();
  // First Name
  if (!firstName) {
    errors.firstName = "First name is required";
  } else if (!nameRegex.test(firstName)) {
    errors.firstName = "Only alphabets allowed";
  } else if (firstName.length < 2 || firstName.length > 20) {
    errors.firstName = "Name must be 2-20 characters";
  }

  // Last Name
  if (!lastName) {
    errors.lastName = "Last name is required";
  } else if (!nameRegex.test(lastName)) {
    errors.lastName = "Only alphabets allowed";
  } else if (lastName.length < 2 || lastName.length > 20) {
    errors.lastName = "Name must be 2-20 characters";
  }

  // Email
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Invalid email address";
  }

  // Phone
  if (!data.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!phoneRegex.test(data.phone)) {
    errors.phone = "Enter valid 10-digit phone number";
  }

  // Password
  if (!data.password.trim()) {
    errors.password = "Password is required";
  } else if (!passwordRegex.test(data.password)) {
    errors.password =
      "Min 6 chars, include uppercase, lowercase, number & special char";
  }

  if (!data.is_termsCheck) {
    errors.is_termsCheck = true;
  }
  return errors;
};
