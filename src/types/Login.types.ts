export type LoginFieldProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  authProvider?: "LOCAL" | "GOOGLE";
  providerId?: string;
  role: string;
  is_termsCheck: boolean;
};