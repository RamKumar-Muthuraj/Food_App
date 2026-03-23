export type UserModel = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  authProvider: "LOCAL" | "GOOGLE";
  providerId: string;
  createdAt: string;
  role: "USER" | "ADMIN";
};